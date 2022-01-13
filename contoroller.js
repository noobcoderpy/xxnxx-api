import axios from "axios";
import Cheerio from "cheerio";

export const list = async (num = 1) => {
    const res = await (await axios.get(`https://www.xnxx.com/pornstar/${num}`)).data
    const ss = Cheerio.load(res)
    const page_count = ss('.pagination').last().text()
    console.log(page_count);
}
list()