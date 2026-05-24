export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  type: 'treasure' | 'collection' | 'obsidian' | 'flavor';
  detailDescription?: string;
  attributes?: string[];
}

export const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuCW7BP9yIsEx9as6wX993J9EgxHjiOU95btAlYg-eSfacYiLuqWvUJBVSOP3Uk_v4xSZhKGlMSCH_9bZK8YB6YlBiOdvY40gUt1rpIEgcJ0bHh9pwj3eOVYG4tKNzZuGQ0SydQ_MuNrvIwTJqv72db1neBDoGEl8aDpBFwMRJv70XWgynCzJucJe4riRXViw-zCxdDXL0zKNaKgNTVzGTBQ5eG6wXC8whQS5VcfLpGyWFHRILmw8jDl1rpEyYyevScConh_qNUbOF1p";

export const TREASURES: Product[] = [
  {
    id: "cocoa-cascade",
    name: "Cocoa Cascade",
    price: 25,
    description: "Velvety dark chocolate shell with a flowing core of rare Ecuadorian cocoa butter.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCs2qUssrjuCKK-hwzKB9rQs-ALnQaCZb2cAUgOJMfXPsnTEMg2hxIVetdwdahrwOE91d5vZv4S6jPkda7YvqpDj5ApZDWAmoiu9MS809jc9XMgcMHa13edHQmro8sdg91F2RN7c_wcKNHVy8JD6M3OsEuiQkjr9yw3n4PYuPWFNl7rfyllmMnugV-wVOjqt3JvZUoQ55r9sihTpMGprGhNn0MKfVxZQm3sV5U8YAA8PhvQZGBW6_Iy0FnuslFMwb6z7vf1-6VxfC_7",
    type: "treasure",
    detailDescription: "Experience an unparalleled rush of authentic dark cocoa. Crafted from premium ground beans harvested along the Napo River, this individual masterpiece offers a velvety hard shell that yields to reveal a slow-release, warm liquid core of raw cocoa butter.",
    attributes: ["74% Single-Origin Cocoa", "Plant-Based Casing", "Zero Artificial Additives"]
  },
  {
    id: "berry-satin",
    name: "Berry Satin",
    price: 25,
    description: "Hand-pressed wild strawberry reduction infused with Tahitian vanilla cream.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfMzhGYAYJRqfXI2wRjTLDjlMyFsoD6aAvkBZjfM9482uzG-at-JamTNDFK5iP1IC_4W6sLg3yxkrVpe_AuCVqsAKEQQgSIKUDcNCpMr8YOV43Wu5buL_qeqJkiwdF-JoNaIYYQF9U3GsbTJrFTPL58pAqIMpxOB0yuuN462dp1AVEiCxUmnSJBT1m5q8uIpnmRFrI2-_p8TtKRoRzBhCUF1WISc7dAC0WN_IKRocu9_OA8_BvEy9MYzWlvzhCzeOTBwtPVWC_62ES",
    type: "treasure",
    detailDescription: "A luxurious marriage of fruit and cream. We prepare fresh strawberry pulp over low temperatures for six hours, then fold it gently into rich Tahitian double-vanilla custard, encapsulating the bright preserve inside an opaque candy shell.",
    attributes: ["Organic Berries", "Tahitian Vanilla Planifolia", "Artisanal Double-Boiled"]
  },
  {
    id: "buttered-elixir",
    name: "Buttered Elixir",
    price: 25,
    description: "A legacy butterscotch recipe, slow-aged and finished with sea salt flakes.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGoxu-WQVNwxkeYxisi70EzIQVBwrOabvdKNbMiO3pZEmLdAH9JiZms9TdBLQ-PzA8i0yM4N6MwPc-ufQ_CBQjgLn8OvqEpRCW2iu9YhesNzqsAJ2eLsP7dnQ0Ki755eHzzZSZT8X0c4wasQy2PWXMJPLLV1S5b2N7iRcNOIv_k3h2ECaO-AANtcSdp15Xub9tSr1t2sSZ956ShuFVzbpAcdVn1axBDdnItNWHLwV8fODmnU-lv22-ypgOjk4pptQjaZP6yCpdPfRE",
    type: "treasure",
    detailDescription: "Our secret family heritage recipe. Real cultured brown dairy butter is caramelized under closely monitored pressure, and aged for 14 days. Garnished at the precise peak of crystallization with crystalline sea salt harvested from pristine southern cliffs.",
    attributes: ["Aged Butterscotch", "Hand-Fleur de Sel", "Copper Kettle Cooked"]
  },
  {
    id: "floss-luxe",
    name: "Floss Luxe",
    price: 25,
    description: "Ethereal cotton candy wisps crystallized within a delicate sugar prism.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCczo3ismNc8nYDaWXXHxQBJGBzydCay7OuQyVVAn5kSa6XHJUcM9qZA8-g8R8Lln6_asy1a69Pbu_H19m4ZnhSR4KEJGKu47EqQoq7AC-elU05u7I4iycXx-diZGhssSfHwzTiqg5N-sf355J6zQGykX8xtzJA8FK6njqUKRPyNnvEcsCFryzdTPn5hRyv5Zx472H1NWZE7K2hHtUNQheMJIcQdHMICXXBYC99DOR2YWZDH8CiwkRSHV3d6i0051695e6x3Xv2s7TL",
    type: "treasure",
    detailDescription: "A magical marvel of physical confectionery. Fine spun-sugar floss, lighter than air, is delicately compressed and entombed inside a glittering glass-like casing of transparent rock sugar. It melts into an explosion of sweet luxury on contact.",
    attributes: ["Confectionary Spun Art", "Glass Rock Sugar Shell", "Ethereal Texture"]
  },
  {
    id: "caramel-dulce",
    name: "Caramel Dulce",
    price: 25,
    description: "Deeply toasted cane sugar caramel with a hints of smoky oak and maple.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDq-j4oY363QUY9Yl6n4aD47wN5l6vfduLL6mf8XHEHm0jsD1LvU11S8WTBIp_uyCZX3W_zdaR-QEfTDMxsY8nv_LAfm9AV9eUvDd2qBhNmTEQoq18aCD_LNUCZjDUFFtIgzXOAHpElPamSTn2ueZdy5DIlgHCx8AglIFHwhaN2G5AZvRYzRDASN114fn3sqxGiOU2vegSIyIW8nXt-_SUHc6OkRYMTjhl4__FAjmEe001ON7LVOIkDlKlqwyyn3OIZmIptQZUmV0Y",
    type: "treasure",
    detailDescription: "Designed for mature palates. Pure cane sugar caramel is fired to an intense, bittersweet copper-toasted finish, and naturally infused inside charred white oak barrels alongside pure concentrated dark maple sap.",
    attributes: ["Double-Charred Maple", "Sweet Smoked Oak Notes", "Gourmet Dulce Finish"]
  },
  {
    id: "mocha-dusk",
    name: "Mocha Dusk",
    price: 25,
    description: "Robust Ethiopian coffee beans roasted dark and swirled with whole milk chocolate.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-GM6LvONnfpvLt0NNH070Q53ghFriIGn9xjVoRVsoP_lItF5D6yU1mkSKLm1YNPaLslg8INKppEIqLJx_LRQ_JezCATLgzZjpaUQHnqV64kNOsFdoiMcj2uwivVRdiysF_dsAhSMR6hPmHT71NiecdWKwrvgndrhGHqWgz4PcKwm1-SahE9CMZsNDBLYXtFJJp-dVjgZN2Uj8FwZprOpgz345c_ekpnIXvka0EUbzy_VXPM-2ECAn-A2C91GHv0e81UbSMB4EP7IN",
    type: "treasure",
    detailDescription: "Awaken your senses at twilight. Fine-ground Ethiopian Sidamo coffee beans are extract-brewed and swirled directly into double-churned Alpine milk chocolate, leaving a satisfying rich, coffee-forward length on the palette.",
    attributes: ["Grade 1 Sidamo Beans", "Alpine Dairy Base", "Micro-roasted Coffee Specks"]
  }
];

export const COLLECTIONS: Product[] = [
  {
    id: "azure-selection",
    name: "Blue Ocean Heritage",
    price: 270,
    description: "An elegant set containing exactly 8 premium pieces of our Floss Luxe cotton candy toffees.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhioxpVg5jf8A3_cxtrUxlXz1kJPPj5EB-lqSkZpTnV5VP-Hmdt_3pjYilZe-z6kreYGmuSmEjfijVF1UtHu6IGyaqRHJlLYk4c-kPpLe5YSwtVxn7B8jc9tls7EUiZwa_du2Fn3DZ8DFpYcmq23cD2Y3lnYWoGfHxni8D_kYGDw4pp6bv8eahEvorv4cbw5SnFuGpr-L8eS_o0u5gpncw4fsI86BBRG22Dlscomgjd9EcDCrLPj4cSL6e_9YeO9wRERHuet-7QLcp",
    type: "collection",
    detailDescription: "An elegant, hand-curated selection showcasing exactly 8 premium pieces of our Floss Luxe cotton candy toffees, offering an ethereal taste of ocean cool.",
    attributes: ["8 Premium Pieces", "Blue Satin Gift Box", "Includes Satin Gift Tote"]
  },
  {
    id: "bronze-selection",
    name: "Bronze Heritage",
    price: 270,
    description: "A chocolate assortment of exactly 8 premium Cocoa Cascade toffees.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKa1VL7VNtv8O4fpJ6jVoG3o3SqW6HDns0E5ev1eAy7Ae_KPUrq8GM9pKc0WWtZhB78xQsy4nvsc5V6_-5xCzDKP-fjJJ84-XrZnjOvLIrevp3H-4rupCPvFhD0yFcdY7QgXtpvzzO3dIhWETe-NYz4hzpQ2QcCiXO34vW4M6xSl5oaWuBECcayt1_zEFV31pQqmU-2DBIQ-HJsB4Dm6Wx3GbnFyBtd6E84lSC2qw_ULIPtuylM4WoLTBO1V0b5XU3vvojd0uHJQK1",
    type: "collection",
    detailDescription: "A curated rich chocolate selection featuring exactly 8 pieces of Cocoa Cascade, crafted for an intense, silky chocolate experience.",
    attributes: ["8 Premium Pieces", "Bronze Presentation Box", "100% Cocoa Cascade"]
  },
  {
    id: "gilt-heritage",
    name: "Gilt Heritage",
    price: 270,
    description: "An exquisite assortment containing exactly 8 premium pieces of Mocha Dusk coffee-infused toffees.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCd7xnb1df8qZJ6yUX-a0TTqP57sAsJjdeaHieC1LBpVjNFTV5xKsNjV0zpUv39U50IEGmIVXKRwbmF3uRbkfohRsZ3rUMFsfE_Qp8jV0pctsTho1szfRSCVP5KUgf3K74-d4yuxbwiSZdTpJkEuKtUwtwVFGNRq0cGp3VT-Ajtl9i63WsfsctHipMHGJFZabRsMR3hdF6Goe9se4LtGQNHBHJAvvhrQIIPaHv9zjGcTnWysk0BrtgGNHtkZPEaoVMkLEfyG3QdRUOX",
    type: "collection",
    detailDescription: "A majestic lineage featuring exactly 8 premium pieces of Mocha Dusk coffee-infused toffees for a delicate, coffee-forward finish.",
    attributes: ["8 Premium Pieces", "Gilt Gold Presentation Box", "Pure Coffee Infusion"]
  },
  {
    id: "artisan-collection",
    name: "Gold Heritage",
    price: 270,
    description: "Includes exactly 8 pieces of deeply caramelized Buttered Elixir butterscotch toffees.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZa2Uqi0gIjNA3gWrPnUNvv5cLLWrrxmnuVRJAoLkiClHY8O7dOHBYgc8AoOhl4XiHgbzCDgOTPETPuTNl1ZAa0Ay2lxEBLpkaKE-wtyFqjCWJhGMMgQGUafHN077I0HecMn1hxs4xBg4x55Mhzh5kfw8QRdSjePZSTfrwKe3YiYXUjJCPudc9q8Vm8fzrM2mXGNpZzniJqir5Yis8IiymwjPbcdLN_Oaxqxkhxfr3NKmeMUGCJx0KbDEFovdY7IB7CtApg5-wcrOB",
    type: "collection",
    detailDescription: "A gourmet celebration displaying exactly 8 pieces of deeply caramelized Buttered Elixir butterscotch toffees, crafted following our secret aged recipe.",
    attributes: ["8 Premium Pieces", "Gold Gift Presentation Box", "Heirloom Recipe"]
  },
  {
    id: "rose-quartz",
    name: "Rose Quartz Heritage",
    price: 270,
    description: "A curation of exactly 8 pieces of sweet Berry Satin strawberry toffees.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChzaYrY5tG030eZzKalC6HEAYD2CR6HcRH8_jbtMAK2DlWyD3GmJiph-xjfZO5UGi4_250yMpWEMUv-4oQaoIUqZL0cKqHfwFkykwhjTh-xl_66XQhGfZj3Ecsiel47lyQHfe5n71-vBArlEPa7PjzqmucT87zn7vA03anQINw8labgsfCi3EHDIU-1aSX7uk5C5QWni9_nPOsPR-WI2HGTe39p-UUQLMJr_XtcEoyUR3_PHyGHppxU1kZQgB0shsyrTBeB2KR8kDX",
    type: "collection",
    detailDescription: "Delicate and blushing botanical aesthetic presenting exactly 8 pieces of Berry Satin strawberry-flavoured toffees.",
    attributes: ["8 Premium Pieces", "Pink Presentation Box", "Pure Fruit Satin"]
  },
  {
    id: "copper-heritage",
    name: "Copper Heritage",
    price: 270,
    description: "An exquisite assortment containing exactly 8 premium pieces of deep luxurious Caramel Dulce toffees.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJESw-KdeM8pC3wpEHTehjFiV1XDbQfWF9vNHP6Mhm0oXKN5yE8FD51AITybT-_BIqFLtxEEl1zhA49inwKypmSHjeb4QiL2SYt0cm2Qjw0JeN4UWBSwOB2tMdI5DANs4mXjipahF6UzazRSLg1bKkw_E-9G5LlgCTRA3vzUNGYm0CuHK0U-dAZgGFAgoy-AG6V1qmm_ZLdKYNIIlVVJwUpvyXCeJxEoJ1TZ2KYw4M10jyISM-8KTXJi7U6p-zeMlO89nWi56MA9eG",
    type: "collection",
    detailDescription: "Celebrating deep butter caramelizations, this bundle contains exactly 8 premium pieces of deep luxurious Caramel Dulce toffees.",
    attributes: ["8 Premium Pieces", "Copper Presentation Box", "Classic Dulce Cook"]
  }
];

export const OBSIDIAN_PRODUCT: Product = {
  id: "obsidian-selection",
  name: "The Obsidian Selection",
  price: 370,
  description: "An unprecedented exploration of taste featuring 12 masterfully crafted pieces: 6 timeless classics paired with 6 exclusive, ultra-rare experimental flavors, hand-packed in our signature matte black presentation box.",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGu4vm58klAz9E1xjA3K6rhbgaG0pjgD6ZiZkWyUNXLBQjHmcp1NOEk2dtaSM-fqySwQ-BGrVJHzYJCeBeKZq-hVF0kDhlmIbGClnTesw-qFWt8UqT_ZTObRoMMCMyjExtR6Tgnpe77uLeRw-bpG0tKBdA7HTq9EB99UPcO1LiNiFDnLAv9UAV2fU5n4fVopgBrOh2lWm4ARPAGBntR6MflM8co7PjYbkZzzazid3ALj8dwlSlmbucRq6R61lduJr9axi3WJ5oNcDJ",
  type: "obsidian",
  detailDescription: "Our flagship peak luxury item. Inside the signature matte black presentation box sits a curated suite of twelve outstanding creations. Fully six of these flavors are experimental formulas created in small test quantities and exclusive to this special edition.",
  attributes: ["Matte Black Presentation Box", "Includes 6 Ultra-Rare Flavors", "Individually Numbered Certificate of Authenticity"]
};

export const EXCLUSIVE_FLAVORS: Product[] = [
  {
    id: "ex-flavor-1",
    name: "Pistachio Silk",
    price: 0,
    description: "Rose and pistachio flavoured toffee. It only comes in Obsidian Selection, one piece per box.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYi9UZJVfh8hmq5uPMIovgZorT-6xMWdyiyKXpTax8PFK8xemJneFnIm5b70dj8FD1CVdlDr78vpgwsfS2VkhxvGd2OaVje8SI2Btzly5i505JOgW6mBTS-JFsqAds3qVtzs5JjtPAww6xyI5kEI25oDPnOVJGFm9soWfBidDcQFb5HlF4kZat0AzQULJ82odUFJlwMHsz639jifxMSLrbiFczkg6e6h580xq8ZQErIVBGgxRjqP-RtD17cfkQXx6PVs3vCtVhKgMj",
    type: "flavor",
    detailDescription: "Rose and pistachio flavoured toffee. It only comes in Obsidian Selection, one piece per box."
  },
  {
    id: "ex-flavor-2",
    name: "Cashew Gianduja",
    price: 0,
    description: "Chocolate and cashew nut flavoured toffee. It only comes in Obsidian Selection, one piece per box.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABKRzMm-2FYTyM0iqq15UNnu4MOPS3iWUtVLx9GL7c8s8K1PtmxzOjZpYNuAJuD8VJigC-jl_ojcFIuFBPnFFzUyHI6xIc95tqirtVjTCs7IeONcGyqNUwMC2gG9yKKsWJvPiLJbTbpcn-PFTiw3DJfiXy7cwRHiyvUVOPjiDe1tGcArwIhJECQ8Bx3D0WbOZdLNcZIWSMkyuq2YezFX_rtsp1GNkSylYVFMXN5EnwEVj1av8Iij2KNuQUXw0AHsszgMJ4KB4G6d0d",
    type: "flavor",
    detailDescription: "Chocolate and cashew nut flavoured toffee. It only comes in Obsidian Selection, one piece per box."
  },
  {
    id: "ex-flavor-3",
    name: "Raspberry Coulis",
    price: 0,
    description: "Raspberry only flavoured toffee. It only comes in Obsidian Selection, one piece per box.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDl7cKlTGqrigt20kcKu5Big1hsF8UMFibd1BrmBhtu-POoyDQLgDOB2JFPJgu5-4FbVgpZupHe8PvGXnjqDIlGjj1K2CYxEBy834Y7HwSAwGzJr6zwMqyXcoIBMn7gnPIda7tfQLYCYf6juDRqKcZIJ6wRhWrJMnecEWn39UwCsVAyET0wxYwp2UGltrCrsJz6sM99LQb78FKnYWxI_dis8eQdpLtOJyyMs-JpsyMR4sJHnki2LL3zMi4AZjNH2bVDfhatvulLfQ3v",
    type: "flavor",
    detailDescription: "Raspberry only flavoured toffee. It only comes in Obsidian Selection, one piece per box."
  },
  {
    id: "ex-flavor-4",
    name: "Brownie Ganache",
    price: 0,
    description: "Hazelnut and brownie flavoured toffee. It only comes in Obsidian Selection, one piece per box.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJLIHl3nhjMgs14MzxMiM1QmrI84ctpvEedAxlp7zItRRrExoc06UBRgdj5X08XuMGI7hCi17AY3rjlTwelJ4d5Y-2lvgJ0Lgq_ifDkx38ikgesCt8XAXE7Z0pJO0X1qPxRfI59ct8qDIhzPwNjOeYRGqezZeutfGMyyn_L7glQLgX9UJG1yqVOP4N6JlLo15gOC4WZ0oNF0Qh2z0Jdp0bS7iSWGeoJlGoaiMpI5eqXCqUl5Uo-jI8JNW8q4H2MfqjPF9MBuEXoC8m",
    type: "flavor",
    detailDescription: "Hazelnut and brownie flavoured toffee. It only comes in Obsidian Selection, one piece per box."
  },
  {
    id: "ex-flavor-5",
    name: "Choco Chip Feuilletine",
    price: 0,
    description: "Choco chip cookie flavoured toffee. It only comes in Obsidian Selection, one piece per box.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSVRAQPr-0J7oo8lFwjShl3HCPRkK6pPm0e_-zJc5gDHIadnliy8qyXVxD6yVZdRrflztugyQnzyXoDgUe3TDQV5rjzK-aDGn_F4tsaSzZJnhpEv4cMBrUqV6BFp74i6l3nqKipNp88sAl_EJhw7WzBe1ti1anmpjhdksy10U_YtODNji88hsitWpTHJVI37QNgsngtDUZdbbNU1SZBlJR-MB-zWzolrVKAPLIlh_QMSGTcyxS78xjNHXFY1c5UD5ZHGfL1b_dOonq",
    type: "flavor",
    detailDescription: "Choco chip cookie flavoured toffee. It only comes in Obsidian Selection, one piece per box."
  },
  {
    id: "ex-flavor-6",
    name: "Blackcurrent Compote",
    price: 0,
    description: "Black current only flavoured toffee. It only comes in Obsidian Selection, one piece per box.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0B_leJsY7I63uz3nl4TOhJBBQkyDd7rWpdIpObDR7NKnGywKhNZ00XkJxKsJ4brZURxUJ6NbG0Z5bZeXh526gJd_EoWbDO4eeTTwlHCABPaAXHaWaxTRiulvVxEiAl3t1myb9Wc_ixPg0YSVGvzNMqT4NYf8h87d7wJWlX2CWOZH8A49x7alzSOOzUJgd9TgPr4mos0nj3DEgb4abRgcHQFkWKpwqCtvr3vqru96IV9kjt1tej4N0_Vt64c672CxGYZQZgpVSWquU",
    type: "flavor",
    detailDescription: "Black current only flavoured toffee. It only comes in Obsidian Selection, one piece per box."
  }
];
