const Especialista = require('../models/Especialista');

class EspecialistaController {
  async index(req, res) {
    try {
      if (!req.query.page) {
        
        const temp = await Especialista.findAll();

        return res.json(temp);

      } else {

        let page = req.query.page;
        let offset = 0 + ((page - 1) * 7);

        const total = await Especialista.count();
        const pages = Math.ceil(total / 7);

        const temp = await Especialista.findAll({ limit: 7, offset: offset});

        return res.json({pages, temp});

      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async show(req, res) {
    try {
      
      if (req.params.id<=0) return res.status(418).json({ error: "São aceitos somente valores de Id maiores do que zero" });

      const temp = await Especialista.findByPk(req.params.id,{
        include: [{ association:'endereco'},{ association:'profissao'},{ association:'agenda'}]
      });

      if (!temp) return res.status(404).json({ error: "Não existe nenhum especialista com esse id" });

      return res.json(temp);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const temp = await Especialista.create(req.body);

      return res.json(temp);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const temp = await Especialista.findByPk(req.params.id);

      await temp.update(req.body);

      return res.json({ temp });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const temp = await Especialista.findByPk(req.params.id);

      await temp.destroy();

      return res.json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new EspecialistaController();