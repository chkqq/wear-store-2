import styles from './style.module.scss'
import InstagramIcon from './icons/instagram.png'
import Image from 'next/image'
const Footer: React.FC = () => {
    return(
        <div className={styles.footer}>
          <div className={styles.contact}>
            <h2>Связь с нами:</h2>
            <p>+7 123 456 7890</p>
            <p>abracadabra@mail.ru</p>
            <div className={styles.instagramLink}>
              <Image src={InstagramIcon} alt="instagram:" />
              <p>@avangaaard</p>
            </div>
          </div>
          <div className={styles.address}>
            <h2>Aдрес:</h2>
            <p>Город: ??????? Улица:?????? Дом:???????</p>
          </div>
        </div>
    )
}

export default Footer