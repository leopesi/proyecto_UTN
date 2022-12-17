import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DireccionDataService from "../services/direccion.service";

const initialState = [];

export const createDireccion = createAsyncThunk("direccion/create",
  async ({ id, data }) => {
    const res = await DireccionDataService.create(id,data);
    return res.data;
  }
);

export const retrieveDireccions = createAsyncThunk("direccion/retrieve",
  async () => {
    const res = await DireccionDataService.getAll();
    //console.log(res.data)
    return res.data;
  }
);

export const updateDireccion = createAsyncThunk("direccion/update",
  async ({ id, data }) => {
    const res = await DireccionDataService.update(id, data);
    return res.data;
  }
);

export const deleteDireccion = createAsyncThunk("direccion/delete",
  async ({ id }) => {
    await DireccionDataService.remove(id);
    return { id };
  }
);

export const deleteAllDireccions = createAsyncThunk("direccion/deleteAll",
  async () => {
    const res = await DireccionDataService.removeAll();
    return res.data;
  }
);

export const findDireccionsByClienteId = createAsyncThunk("direccion/ByClienteId",
  async ({ id }) => {
    const res = await DireccionDataService.findByClienteId(id);
    console.log(`clienteId ${id}`)
    return res.data;
  }
);

const direccionSlice = createSlice({
  name: "direccion",
  initialState,
  extraReducers: {
    [createDireccion.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveDireccions.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateDireccion.fulfilled]: (state, action) => {
      const index = state.findIndex(direccion => direccion.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteDireccion.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllDireccions.fulfilled]: (state, action) => {
      return [];
    },
    [findDireccionsByClienteId.fulfilled]: (state, action) => {
      return [action.payload];
    },
  },
});

const { reducer } = direccionSlice;
export default reducer;