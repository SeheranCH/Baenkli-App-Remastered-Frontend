import api from '../config/Api';

const UserService = {
    login: (dto) => {
        return api.post(`/login`, dto);
    },
};

export default UserService;