import api from '../config/Api';

const UserService = {
    login: (dto) => {
        return api.post(`/login`, dto);
    },
    create: (dto) => {
        return api.post(`/users`, dto);
    },
    update: (id, dto) => {
        return api.put(`/users/${id}`, dto);
    },
    getById: (id) => {
        return api.get(`/users/${id}`);
    },
    getAll: () => {
        return api.get(`/users`);
    },
    delete: (id) => {
        return api.delete(`/users/${id}`);
    }
};

export default UserService;