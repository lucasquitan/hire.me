import shortid from 'shortid';
import Url from '../models/Url';

function isValid(string) {
  const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
    + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
    + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
    + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
    + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
    + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(string);
}

class UrlController {
  async index(req, res) {
    const url = await Url.findAll();

    return res.json(url);
  }

  async show(req, res) {
    const { alias } = req.params;

    if (!alias) {
      return res.status(404).json({
        err_code: '002',
        description: 'Shortened URL not found.',
      });
    }

    const url = await Url.findByPk(alias);
    if (!url) {
      return res.status(404).json({
        err_code: '002',
        description: 'Shortened URL not found.',
      });
    }

    return res.redirect(url.url);
  }

  async store(req, res) {
    const start = new Date();
    const { url, CUSTOM_ALIAS } = req.query;

    // If the URL is empty
    if (!url) {
      return res.status(404).json({
        err_code: '000',
        description: 'The URL is empty.',
      });
    }

    // Validate the URL
    if (!isValid(url)) {
      return res.status(404).json({
        err_code: '003',
        description: 'The URL is not valid.',
      });
    }

    // Verification if alias is provided
    if (!CUSTOM_ALIAS) {
      const alias = shortid.generate();
      const result = await Url.create({
        alias,
        url,
      });

      const response = {
        alias: result.alias,
        url: result.url,
        statistics: {
          time_taken: `${new Date() - start}ms`,
        },
      };

      return res.status(200).json(response);
    }

    // Verify if CUSTOM_ALIAS exists
    const data = await Url.findByPk(CUSTOM_ALIAS);
    if (data) {
      return res.status(401).json({
        alias: CUSTOM_ALIAS,
        err_code: '001',
        description: 'Custom alias already exists.',
      });
    }

    const response = {
      alias: CUSTOM_ALIAS.CUSTOM_ALIAS,
      url: data.url,
      statistics: {
        time_taken: `${new Date() - start}ms`,
      },
    };

    return res.status(200).json(response);
  }

  async delete(req, res) {
    try {
      const start = new Date();
      const { alias } = req.params;
      const url = await Url.findByPk(alias);

      await url.destroy();

      return res.status(200).json({
        alias: url.alias,
        url: url.url,
        statistics: {
          time_taken: `${new Date() - start}ms`,
          description: 'The shorten URL was removed.',
        },
      });
    } catch (e) {
      return res.status(400).json({ error: `${e}` });
    }
  }
}

export default new UrlController();
