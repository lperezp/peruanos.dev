import { ICommunity } from '../models/community.model';

export const COMMUNITIES: ICommunity[] = [
    {
        "name": "Angular Perú",
        "description": "Este grupo es para personas apasionadas en el desarrollo y que estén interesadas en aprender y compartir acerca de Angular. Iniciamos este grupo para mostrar este gran Framework de Google para poder crear aplicaciones en tiempo récord.",
        "logo_url": "https://ngconf-peru.web.app/icons/logo_AngularPeru.svg",
        "city": "Lima",
        "topics": [
            "Angular",
            "Google Technologies"
        ],
        "contact": {
            "email": "angularcommunityperu@gmail.com",
            "website": "https://www.angular-peru.com/",
            "socialMedia": {
                "github": "https://github.com/AngularPeru/",
                "twitter": "https://x.com/angularperung/",
                "linkedin": "https://www.linkedin.com/company/angular-community-peru/",
                "discord": "https://www.youtube.com/@AngularPeru/"
            }
        }
    },
    {
        "name": "Google Developers Group Callao",
        "description": "Google Developers Groups Callao es una iniciativa para concentrar los esfuerzos de muchos desarrolladores en el Callao y sus alrededores para aprender, compartir y ser productivos utilizando los diversos productos de Google.",
        "logo_url": "https://gdgcallao.dev/assets/icons/ic_gdgcallao_black.svg",
        "city": "Callao",
        "topics": [
            "Angular",
            "Firebase",
            "Cloud",
            "Flutter",
            "Google Technologies"
        ],
        "contact": {
            "email": "developer.group.callao@gmail.com",
            "website": "https://gdgcallao.dev/",
            "socialMedia": {
                "github": "https://github.com/GDGCallao/",
                "twitter": "https://x.com/GDG_Callao/",
                "linkedin": "https://www.linkedin.com/company/google-developer-groups-callao/",
                "discord": "https://www.youtube.com/@GDG_Callao/"
            }
        }
    }
];