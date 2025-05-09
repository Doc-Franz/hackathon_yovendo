const db = require('./../db');

exports.newOrganization = async (req, res) => {
  const { name } = req.body;
  console.log(name);

  try {
    const result = await db.one(
      'INSERT INTO organizations(name) VALUES($1) RETURNING *',
      [name],
    );
    res.status(201).json({
      message: 'The organization has been added',
      content: result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
