import axios from 'axios';

const buildClient = ({ req }) => {
  const config =
    typeof window === 'undefined'
      ? {
          baseURL:
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
          headers: req.headers,
        }
      : {
          baseURL: '/',
        };

  return axios.create(config);
};

export default buildClient;
