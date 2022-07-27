import shortid from 'shortid';
import Url from '../models/Url';

class UrlController {
  async index(req, res) {
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

  async show(req, res) {
    const urls = await Url.findAll();

    if (!urls) {
      return res.status(404).json({ message: 'No shorted URL are found.' });
    }

    const result = urls.map((item) => ({
      alias: item.alias,
      url: item.url,
    }));

    return res.json(result);
  }

  async store(req, res) {
    const start = new Date();
    const { url, CUSTOM_ALIAS } = req.query;

    // If the URL is empty
    if (!url) {
      return res.status(400).json({
        err_code: '000',
        description: 'The URL is empty.',
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

      return res.json(response);
    }
    // Verify if alias already exist.
    const id = await Url.findByPk(CUSTOM_ALIAS);

    if (id) {
      return res.status(401).json({
        alias: url.alias,
        err_code: '001',
        description: 'Custom alias already exists.',
      });
    }

    const response = {
      alias: CUSTOM_ALIAS,
      url,
      statistics: {
        time_taken: `${new Date() - start}ms`,
      },
    };

    return res.json(response);
  }
}

export default new UrlController();
