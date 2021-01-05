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
    getAll: () => {
        return api.get(`/benches`);
    }
};

export default BenchService;