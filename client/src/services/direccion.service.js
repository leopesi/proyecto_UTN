import api from "./api";

const getAll = () => {
  return api.get("/direccion");
};

const get = id => {
  return api.get(`/direccion/${id}`);
};

const create = (id, data) => {
  return api.post(`/direccion/${id}`, data);
};

const update = (id, data) => {
  return api.put(`/direccion/${id}`, data);
};

const remove = id => {
  return api.delete(`/direccion/${id}`);
};

const removeAll = () => {
  return api.delete(`/direccion`);
};

const findByClienteId = ClienteId => {
  return api.get(`/direccion/cliente/${ClienteId}`);
};

const DireccionService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByClienteId
};

export default DireccionService;