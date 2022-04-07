export const index = async (request, response) => {
  response.json({ apiStatus: 'ok', date: new Date(), env: process.env });
};
