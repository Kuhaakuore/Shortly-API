import {
  createUserRepository,
  getUserDataByIdRepository,
  getUserRepository,
} from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import generateToken from "../services/auth.service.js";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const user = await getUserRepository(email);

    if (user.rows.length > 0) {
      return res.status(409).send("User already exists");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Password does not match");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await createUserRepository(name, email, hash);

    res.status(201).send("User created");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await getUserRepository(email);

    if (user.rows.length === 0) {
      return res.status(401).send("Email incorrect");
    }

    const isValid = await bcrypt.compare(password, user.rows[0].password);

    if (!isValid) {
      return res.status(401).send("Password incorrect");
    }

    const token = generateToken(user.rows[0].id);

    res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export async function getUserData(req, res) {
  const { userId } = res.locals;

  try {
    const userData = (await getUserDataByIdRepository(userId)).rows[0];

    if (!userData) {
      return res.status(404).send("User not found");
    }

    userData.visitCount = userData.visitCount || 0;
    if (userData.shortenedUrls[0].id === null) {
      userData.shortenedUrls = [];
    }

    res.status(200).send(userData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}
