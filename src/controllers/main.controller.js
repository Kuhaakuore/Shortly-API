import { getRankingRepository } from "../repositories/main.repository.js";

export async function getRanking(req, res) {
  try {
    const ranking = await getRankingRepository();

    res.status(200).send(ranking.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}