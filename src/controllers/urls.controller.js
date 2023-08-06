import { createUrlRepository, findUrlByShortUrlRepository } from "../repositories/url.repository.js";
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
    console.log(err);
    res.status(500).send(err.message);
  }
}
