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

export default authController;
