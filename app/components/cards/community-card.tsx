import Image from 'next/image';
import styles from './community-card.module.scss';
import Link from 'next/link';

export default function CommunityCard() {
    return (
        <article>
            <Link href="/" className={styles.card}>
                <div className={styles.card__logo}>
                    <Image className={styles.image} src="/images/logo-community.png" alt="Logo de Peruanos Dev" width={144} height={144} />
                </div>
                <div className={styles.card__info}>
                    <h2 className={styles.card__infoTitle}>Peruanos Dev</h2>
                    <p className={styles.card__infoParagraph}>Este grupo es para personas apasionadas en el desarrollo de aplicaciones móviles que estén interesadas en aprender y compartir
                        acerca de Flutter. Iniciamos este grupo para mostrar este gran Framework de Google para poder crear aplicaciones multiplataforma en tiempo récord. Este grupo es para
                        personas apasionadas en el desarrollo de aplicaciones móviles que estén interesadas en aprender y compartir acerca de Flutter. Iniciamos este grupo para mostrar este
                        gran Framework de Google para poder crear aplicaciones multiplataforma en tiempo récord. Este grupo es para personas apasionadas en el desarrollo de aplicaciones móviles
                        que estén interesadas en aprender y compartir acerca de Flutter. Iniciamos este grupo para mostrar este gran Framework de Google para poder crear aplicaciones multiplataforma
                        en tiempo récord.</p>
                    <div className={styles.card__location}>
                        <Image src="./svg/icon-pin.svg" alt="Ubicación" width={16} height={20} />
                        <span>Lima</span>
                    </div>
                </div>
            </Link>
        </article>
    );
}