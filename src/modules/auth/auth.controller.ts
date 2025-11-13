import { Router, Request, Response } from "express";
import datasource from "../../datasource";
import { User } from "../users/user.entity";
import { compare, hash } from "bcryptjs";
import { encodeJwt } from "../../lib/jwt";

const authController = Router();
const userRepository = datasource.getRepository(User);

// ユーザー登録
authController.post("/signup", async (req: Request, res: Response) => {
  try {
    // 必須バリデーション
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "名前、メール、パスワードは必須です" });
    }

    // メールアドレス重複チェック
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      res
        .status(400)
        .json({ message: "このメールアドレスは既に使用されています" });
    }

    // パスワードのハッシュ化
    const hashedPassword = await hash(password, 10);

    // ユーザー作成
    const user = await userRepository.save({
      name,
      email,
      password_hash: hashedPassword,
    });

    // トークン作成
    const token = encodeJwt(user.id);

    // レスポンスからパスワードを除外
    const { password_hash: _, ...userWithoutPassword } = user;
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (e) {
    console.error("ユーザー登録エラー：", e);
    res.status(500).json({ message: "サーバーエラーが発生しました" });
  }
});

// ログイン
authController.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 必須バリデーション
    if (!email || !password) {
      res.status(400).json({ message: "メールとパスワードは必須です" });
      return;
    }

    // ユーザーの検索
    const user = await userRepository.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      res
        .status(401)
        .json({ message: "メールアドレスまたはパスワードが正しくありません" });
      return;
    }

    // パスワードの確認
    const isPasswordValid = await compare(password, user.password_hash);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      res
        .status(401)
        .json({ message: "メールアドレスまたはパスワードが正しくありません" });
    }

    // JWTトークンの生成
    const token = encodeJwt(user.id);

    // パスワードを除外してレスポンスを返却
    const { password_hash: _, ...userWithoutPassword } = user;
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (e) {
    console.error("ログインエラー：", e);
    res.status(500).json({ message: "サーバーエラーが発生しました" });
  }
});

// 現在のユーザー情報取得
authController.get("/me", async (req: Request, res: Response) => {
  try {
    if (req.currentUser == null) {
      res.status(200).json(null);
      return;
    }
    const { password_hash, ...userWithoutPassword } = req.currentUser;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("ユーザー情報取得エラー:", error);
    res.status(500).json({ message: "サーバーエラーが発生しました" });
  }
});

export default authController;
