import InstagramIcon from '../../../../public/icons/instagram.png'
import Image from 'next/image'

const Footer: React.FC = () => {
  return (
    <div className="flex flex-row 
    justify-evenly 
    bg-white 
    text-[#333333] 
    w-full 
    h-[250px] 
    bg-gradient-to-b from-[rgba(0,0,0,0.01)] to-[rgba(0,0,0,0)]">
      <div className="flex flex-col mt-[20px] gap-[15]">
        <h2>Связь с нами:</h2>
        <p>+7 123 456 7890</p>
        <p>abracadabra@mail.ru</p>
        <div className="flex cursor-pointer h-[24px] gap-[5px]">
          <Image src={InstagramIcon} alt="instagram:" />
          @avangaaard
        </div>
      </div>
      <div className="flex flex-col gap-[15px] mt-[20px]">
        <h2>Aдрес:</h2>
        <p>Город: ??????? Улица:?????? Дом:???????</p>
      </div>
    </div>
  )
}

export default Footer