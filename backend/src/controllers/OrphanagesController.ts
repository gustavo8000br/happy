import { Request, Response } from "express";
import { getRepository } from "typeorm";
import orphanageView from "../views/orphanages_view";
import * as Yup from "yup";

import Orphanage from "../models/Orphanage";

export default {
  async index(req: Request, res: Response) {
    const orphanageRepository = getRepository(Orphanage);

    const orphanages = await orphanageRepository.find({
      relations: ["images"],
    });

    return res.json(orphanageView.renderMany(orphanages));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const orphanageRepository = getRepository(Orphanage);

    const orphanage = await orphanageRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return res.json(orphanageView.render(orphanage));
  },

  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      telephone,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const orphanageRepository = getRepository(Orphanage);

    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      telephone,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório'),
      latitude: Yup.number().required('Latitude obrigatório'),
      longitude: Yup.number().required('Longitude obrigatório'),
      about: Yup.string().required('Sobre obrigatório').max(300),
      instructions: Yup.string().required('Instruções obrigatório'),
      telephone: Yup.number(),
      opening_hours: Yup.string().required('Horário de funcionamento obrigatório'),
      open_on_weekends: Yup.boolean().required('Aberto nos finais de semana obrigatório'),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required('Ao menos 1 (Uma) imagem e requerida')
        })
      )
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanageRepository.create(data);

    await orphanageRepository.save(orphanage);

    return res.status(201).json(orphanage);
  },
};
