import {
  createUrlRepository,
  deleteUrlRepository,
  findUrlByIdRepository,
  findUrlByShortUrlRepository,
  getUrlsRepository,
  updateVisitCountRepository,
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

export async function redirectToUrl(req, res) {
  try {
    const url = (await findUrlByShortUrlRepository(req.params.shortUrl))
      .rows[0];

    if (!url) {
      return res.status(404).send({ message: "URL not found" });
    }

    await updateVisitCountRepository(url.shortUrl);

    res.redirect(url.url);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const { userId } = res.locals;

  try {
    const url = (await getUrlsRepository(id)).rows[0];

    if (!url) {
      return res.status(404).send({ message: "URL not found" });
    }

    if (userId !== url.userId) {
      return res
        .status(401)
        .send({ message: "You don't have permission to delete this URL" });
    }

    await deleteUrlRepository(id);

    res.status(204).send({ message: "URL deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
}
