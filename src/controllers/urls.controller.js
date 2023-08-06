import {
  createUrlRepository,
  findUrlByIdRepository,
  findUrlByShortUrlRepository,
} from "../repositories/url.repository.js";
import { generateShortUrl } from "../services/url.service.js";

export async function createUrl(req, res) {
  const { url } = req.body;
  const { userId } = res.locals;

  try {
    const shortUrl = generateShortUrl();

    await createUrlRepository(userId, url, shortUrl);

    const id = (await findUrlByShortUrlRepository(shortUrl)).rows[0].id;

    res.status(201).send({ id, shortUrl });
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
}

export async function getUrl(req, res) {
  const { id } = req.params;

  try {
    const url = (await findUrlByIdRepository(id)).rows[0];

    if (!url) {
      return res.status(404).send({ message: "URL not found" });
    }
    
    res.status(200).send(url);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
}
