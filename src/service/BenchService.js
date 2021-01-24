import api from '../config/Api';

const BenchService = {
    create: (dto) => {
        return api.post(`/benches`, dto);
    },
    update: (id, dto) => {
        return api.put(`/benches/${id}`, dto);
    },
    getById: (id) => {
        return api.get(`/benches/${id}`);
    },
    getAllFavorites: (userId) => {
        return api.get(`/benches/favorites/${userId}`);
    },
    getOwnBenches: (userId) => {
        return api.get(`/benches/users/${userId}`);
    },
    getAll: () => {
        return api.get(`/benches`);
    },
    delete: (id) => {
        return api.delete(`/benches/${id}`)
    }
};

export default BenchService;