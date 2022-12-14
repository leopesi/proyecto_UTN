import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ClientDataService from "../services/client.service";

const initialState = [];

export const createClient = createAsyncThunk("client/create",
  async ({nombre, apellido, email, telefono }) => {
    const res = await ClientDataService.create({ nombre, apellido, email, telefono });
    return res.data;
  }
);

export const retrieveClients = createAsyncThunk("client/retrieve",
  async () => {
    const res = await ClientDataService.getAll();
    return res.data;
  }
);

export const updateClient = createAsyncThunk("client/update",
  async ({ id, data }) => {
    const res = await ClientDataService.update(id, data);
    return res.data;
  }
);

export const deleteClient = createAsyncThunk("client/delete",
  async ({ id }) => {
    await ClientDataService.remove(id);
    return { id };
  }
);

export const deleteAllClients = createAsyncThunk("client/deleteAll",
  async () => {
    const res = await ClientDataService.removeAll();
    return res.data;
  }
);

export const findClientsByName = createAsyncThunk("client/findByName",
  async ({ nombre }) => {
    const res = await ClientDataService.findByName(nombre);
    return res.data;
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState,
  extraReducers: {
    [createClient.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveClients.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateClient.fulfilled]: (state, action) => {
      const index = state.findIndex(client => client.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteClient.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllClients.fulfilled]: (state, action) => {
      return [];
    },
    [findClientsByName.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = clientSlice;
export default reducer;