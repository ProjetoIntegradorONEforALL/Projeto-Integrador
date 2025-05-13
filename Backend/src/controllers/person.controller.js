const getAll = (req, res) => {
  res.status(200).json({
    message: 'List of persons (mock)',
    data: [
      { id: 1, name: 'Maria' },
      { id: 2, name: 'João' }
    ]
  });
};

module.exports = { getAll };
