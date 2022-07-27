import { Router } from 'express';
import shortid from 'shortid';
import Url from '../models/Url';

const routes = Router();

routes.get('/:alias', async (req, res) => {
    const { alias } = req.params;

    if (!alias) {
        return res.status(404).json({
            err_code: "002", 
            description: "Shortened URL not found."
        })
    }

    const url = await Url.findByPk(alias);
    if (!url) {
        return res.status(404).json({
            err_code: "002", 
            description: "Shortened URL not found."
        })
    }

    res.redirect(url.url);

});

routes.put('/create/:CUSTOM_ALIAS?', async (req, res) => {
    const start = new Date();
    const { url, CUSTOM_ALIAS } = req.query;
    console.log("Start: ", url, CUSTOM_ALIAS);

    // If the URL is empty
    if (!url) {
        return res.status(400).json({
            err_code: "000",
            description: "The URL is empty."
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
                time_taken: new Date() - start + "ms",
            }
        }

        return res.json(response);
    } else {
        // Verify if alias already exist.
        const id = await Url.findByPk(CUSTOM_ALIAS);

        if (id) {
            return res.status(401).json({
                alias: url.alias,
                err_code: "001",
                description: "Custom alias already exists."
            });
        }

        const newUrl = await Url.create({
            alias: CUSTOM_ALIAS,
            url,
        });

        const response = {
            alias: CUSTOM_ALIAS,
            url,
            statistics: {
                time_taken: new Date() - start + "ms",
            }
        }

        return res.json(response);
    }
 });

export default routes;