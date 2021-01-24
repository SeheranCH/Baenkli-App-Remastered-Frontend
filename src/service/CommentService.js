import api from '../config/Api';

const CommentService = {
    create: (dto) => {
        return api.post(`/comments`, dto);
    },
    update: (id, dto) => {
        return api.put(`/comments/${id}`, dto);
    },
    getById: (id) => {
        return api.get(`/comments/${id}`);
    },
    getByBenchId: (id) => {
        return api.get(`/comments/bench/${id}`);
    },
    getAll: () => {
        return api.get(`/comments`);
    },
    delete: (id) => {
        return api.delete(`/comments/${id}`)
    }
};

export default CommentService;