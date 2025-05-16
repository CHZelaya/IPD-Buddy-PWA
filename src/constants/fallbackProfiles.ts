export interface FallbackProfile {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}


export const fallbackProfiles : Record<string, FallbackProfile> = {
  'chzelaya1201@gmail.com': {
    name: 'Beto',
    lastName: 'Hernandez-Zelaya',
    email: 'chzelaya1201@gmail.com',
    phoneNumber: '5872296905',
  },
  'Khcontracting@live.com': {
    name: 'Kyle',
    lastName: 'Hubick',
    email: 'Khcontracting@live.com',
    phoneNumber: '4039992350',
  },
};
