import BotTg from "/BotTg.svg";
import Web from "/Web.svg";
import Tg from "/Tg.svg";
import BotVk from "/BotVk.svg";
import Vk from "/Vk.svg";
import YouTube from "/YouTube.svg";

export default function Footer() {
  return (
    <footer className="mx-2 mb-2 py-10 bg-[#B75DF8] rounded-4xl shadow-[0_4px_16px_rgba(152,16,250,0.35)]">
      <h2 className="text-center font-semibold uppercase text-white">
        Твой университетский гид - в наших пабликах
      </h2>
      <div className="mt-8 flex gap-4 justify-center">
        <a href="https://www.vyatsu.ru/" target="_blank">
          <img src={Web} alt="Сайт ВятГУ" />
        </a>
        <a href="https://vk.com/vyatsu_chatbot" target="_blank">
          <img src={BotVk} alt="ВКонтакте чат-бот ВятГУ" />
        </a>
        <a
          href="https://vk.com/away.php?to=https%3A%2F%2Ft.me%2FVyatsu_chatbot&cc_key="
          target="_blank"
        >
          <img src={BotTg} alt="Telegram чат-бот ВятГУ" />
        </a>
        <a href="https://vk.com/vyatsu" target="_blank">
          <img src={Vk} alt="ВК ВятГУ" />
        </a>
        <a href="https://t.me/vyatsunews" target="_blank">
          <img src={Tg} alt="Telegram ВятГУ" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCpDvPubFb1xdKRir2F0_4kg"
          target="_blank"
        >
          <img src={YouTube} alt="YouTube ВятГУ" />
        </a>
      </div>
      <p className="text-white font-light text-[12px] text-center mt-8">
        © 2012 - 2025 Вятский государственный университет
      </p>
    </footer>
  );
}
