import api from "../services/api";


const getAll = () => {
  return api.get("/cliente");
};

const get = id => {
  return api.get(`/cliente/${id}`);
};

const create = data => {
  return api.post("/cliente", data);
};

const update = (id, data) => {
  return api.put(`/cliente/${id}`, data);
};

const remove = id => {
  return api.delete(`/cliente/${id}`);
};

const removeAll = () => {
  return api.delete(`/cliente`);
};

const findByName = nombre => {
  return api.get(`/cliente?nombre=${nombre}`);
};

const ClientService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default ClientService;