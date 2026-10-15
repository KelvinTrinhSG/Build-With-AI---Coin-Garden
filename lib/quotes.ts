// The quote register: 100 lessons on long-term investing from investors with long, successful records.
// A harvested sunflower receives one of these at random (see lib/lessons.ts).
//
// Every quote is verbatim from its source; "…" marks words left out at the start or middle.
// Gathered on 2026-10-15 from Warren Buffett's Berkshire Hathaway shareholder letters
// (berkshirehathaway.com/letters) and from Wikiquote's sourced sections for each investor.
// Ids are stable: saved plants refer to them, so never renumber; add new quotes at the end.

export type Quote = { id: string; text: string; author: string; source: string };

export const QUOTES: Quote[] = [
  // Warren Buffett
  { id: "q001", author: "Warren Buffett", source: "Forbes interview, 1974", text: "The stock market is a no-called-strike game. You don't have to swing at everything — you can wait for your pitch." },
  { id: "q002", author: "Warren Buffett", source: "Forbes interview, 1974", text: "All day you wait for the pitch you like; then when the fielders are asleep, you step up and hit it." },
  { id: "q003", author: "Warren Buffett", source: "Forbes interview, 1974", text: "People have been successful investors because they've stuck with successful companies." },
  { id: "q004", author: "Warren Buffett", source: "Forbes interview, 1974", text: "Draw a circle around the businesses you understand and then eliminate those that fail to qualify on the basis of value, good management and limited exposure to hard times." },
  { id: "q005", author: "Warren Buffett", source: "Forbes interview, 1974", text: "You're dealing with a lot of silly people in the marketplace; it's like a great big casino and everyone else is boozing. If you can stick with Pepsi, you should be O.K." },
  { id: "q006", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1984", text: "…we find doing nothing the most difficult task of all." },
  { id: "q007", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1985", text: "We may hold a stock for a decade or more, and during that period it may grow quite consistently in both business and market value." },
  { id: "q008", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1986", text: "What we do know, however, is that occasional outbreaks of those two super-contagious diseases, fear and greed, will forever occur in the investment community." },
  { id: "q009", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1986", text: "Our goal is more modest: we simply attempt to be fearful when others are greedy and to be greedy only when others are fearful." },
  { id: "q010", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1987", text: "Our goal is to find an outstanding business at a sensible price, not a mediocre business at a bargain price." },
  { id: "q011", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1987", text: "…an investor will succeed by coupling good business judgment with an ability to insulate his thoughts and behavior from the super-contagious emotions that swirl about the marketplace." },
  { id: "q012", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1987", text: "Volatility caused by money managers who speculate irrationally with huge sums will offer the true investor more chances to make intelligent investment moves." },
  { id: "q013", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1988", text: "In fact, when we own portions of outstanding businesses with outstanding managements, our favorite holding period is forever." },
  { id: "q014", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1989", text: "Time is the friend of the wonderful business, the enemy of the mediocre." },
  { id: "q015", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1990", text: "The most common cause of low prices is pessimism… It's optimism that is the enemy of the rational buyer." },
  { id: "q016", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1990", text: "Even though we had bought some shares at the prices prevailing before the fall, we welcomed the decline because it allowed us to pick up many more shares at the new, panic prices." },
  { id: "q017", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1991", text: "Our stay-put behavior reflects our view that the stock market serves as a relocation center at which money is moved from the active to the patient." },
  { id: "q018", author: "Warren Buffett", source: "Statement, January 1991 (Of Permanent Value, 2007)", text: "Someone's sitting in the shade today because someone planted a tree a long time ago." },
  { id: "q019", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1992", text: "We've long felt that the only value of stock forecasters is to make fortune tellers look good." },
  { id: "q020", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1992", text: "Even now, Charlie and I continue to believe that short-term market forecasts are poison and should be kept locked up in a safe place, away from children and also from grown-ups who behave in the market like children." },
  { id: "q021", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1992", text: "…I revised my strategy and tried to buy good businesses at fair prices rather than fair businesses at good prices." },
  { id: "q022", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1992", text: "Consciously paying more for a stock than its calculated value - in the hope that it can soon be sold for a still-higher price - should be labeled speculation (which is neither illegal, immoral nor - in our view - financially fattening)." },
  { id: "q023", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1993", text: "An investor should ordinarily hold a small piece of an outstanding business with the same tenacity that an owner would exhibit if he owned all of that business." },
  { id: "q024", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1994", text: "Investors should remember that their scorecard is not computed using Olympic-diving methods: Degree-of-difficulty doesn't count." },
  { id: "q025", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1994", text: "We will continue to ignore political and economic forecasts, which are an expensive distraction for many investors and businessmen." },
  { id: "q026", author: "Warren Buffett", source: "Buffett: The Making of an American Capitalist, 1995", text: "Never count on making a good sale. Have the purchase price be so attractive that even a mediocre sale gives good results." },
  { id: "q027", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1996", text: "Your goal as an investor should simply be to purchase, at a rational price, a part interest in an easily-understandable business whose earnings are virtually certain to be materially higher five, ten and twenty years from now." },
  { id: "q028", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1996", text: "If you aren't willing to own a stock for ten years, don't even think about owning it for ten minutes." },
  { id: "q029", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1996", text: "Put together a portfolio of companies whose aggregate earnings march upward over the years, and so also will the portfolio's market value." },
  { id: "q030", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1996", text: "You only have to be able to evaluate companies within your circle of competence. The size of that circle is not very important; knowing its boundaries, however, is vital." },
  { id: "q031", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1996", text: "…you should entirely avoid owning stocks if a crashing market would lead you to panic and sell." },
  { id: "q032", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1996", text: "Selling fine businesses on “scary” news is usually a bad decision." },
  { id: "q033", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1997", text: "Only those who will be sellers of equities in the near future should be happy at seeing stocks rise. Prospective purchasers should much prefer sinking prices." },
  { id: "q034", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1998", text: "…a majority of our shares are held by investors who expect to die still holding them." },
  { id: "q035", author: "Warren Buffett", source: "Berkshire Hathaway annual meeting, 1998", text: "We don't get paid for activity, just for being right. As to how long we'll wait, we'll wait indefinitely." },
  { id: "q036", author: "Warren Buffett", source: "Berkshire Hathaway annual meeting, 1998", text: "Investors making purchases in an overheated market need to recognize that it may often take an extended period for the value of even an outstanding company to catch up with the price they paid." },
  { id: "q037", author: "Warren Buffett", source: "BusinessWeek, 1999", text: "Success in investing doesn't correlate with I.Q. once you're above the level of 125. Once you have ordinary intelligence, what you need is the temperament to control the urges that get other people into trouble in investing." },
  { id: "q038", author: "Warren Buffett", source: "BusinessWeek, 1999", text: "The best thing that happens to us is when a great company gets into temporary trouble… We want to buy them when they're on the operating table." },
  { id: "q039", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1999", text: "If we have a strength, it is in recognizing when we are operating well within our circle of competence and when we are approaching the perimeter." },
  { id: "q040", author: "Warren Buffett", source: "Berkshire Hathaway letter, 2001", text: "After all, you only find out who is swimming naked when the tide goes out." },
  { id: "q041", author: "Warren Buffett", source: "Berkshire Hathaway letter, 2004", text: "Investors should remember that excitement and expenses are their enemies." },
  { id: "q042", author: "Warren Buffett", source: "Interview with Charlie Rose, 2008", text: "You want to be greedy when others are fearful. You want to be fearful when others are greedy. It's that simple." },
  { id: "q043", author: "Warren Buffett", source: "Berkshire Hathaway letter, 2008", text: "Long ago, Ben Graham taught me that “Price is what you pay; value is what you get.” Whether we're talking about socks or stocks, I like buying quality merchandise when it is marked down." },
  { id: "q044", author: "Warren Buffett", source: "Berkshire Hathaway letter, 2008", text: "When forced to choose, I will not trade even a night's sleep for the chance of extra profits." },
  { id: "q045", author: "Warren Buffett", source: "My Philanthropic Pledge, 2010", text: "My wealth has come from a combination of living in America, some lucky genes, and compound interest." },
  { id: "q046", author: "Warren Buffett", source: "Berkshire Hathaway letter, 2014", text: "Huge institutional investors, viewed as a group, have long underperformed the unsophisticated index-fund investor who simply sits tight for decades." },
  { id: "q047", author: "Warren Buffett", source: "Remarks to University of Maryland students, 2016", text: "Anyone who has become rich twice is dumb. Why would you risk what you need and have for what you don't need?" },
  { id: "q048", author: "Warren Buffett", source: "Berkshire Hathaway annual meeting, 2020", text: "In my view, for most people, the best thing to do is to own the S&P 500 index fund." },
  { id: "q049", author: "Warren Buffett", source: "The Superinvestors of Graham-and-Doddsville, 1984", text: "The investors simply focus on two variables: price and value." },
  { id: "q050", author: "Warren Buffett", source: "The Superinvestors of Graham-and-Doddsville, 1984", text: "There seems to be some perverse human characteristic that likes to make easy things difficult." },
  { id: "q051", author: "Warren Buffett", source: "As quoted by The Motley Fool, 2014", text: "Opportunities come infrequently. When it rains gold, put out the bucket, not the thimble." },

  // Benjamin Graham
  { id: "q052", author: "Benjamin Graham", source: "As quoted by Warren Buffett, Forbes, 1974", text: "You are neither right nor wrong because people agree with you." },
  { id: "q053", author: "Benjamin Graham", source: "The Intelligent Investor, 1949", text: "The genuine investor in common stocks does not need a great equipment of brain and knowledge, but he does need some unusual qualities of character." },
  { id: "q054", author: "Benjamin Graham", source: "The Intelligent Investor, 1949", text: "It is no difficult trick to bring a great deal of energy, study, and native ability into Wall Street and to end up with losses instead of profits." },
  { id: "q055", author: "Benjamin Graham", source: "The Intelligent Investor, 1949", text: "Intelligent investment is more a matter of mental approach than it is of technique. A sound mental approach toward stock fluctuations is the touchstone of all successful investment under present-day conditions." },
  { id: "q056", author: "Benjamin Graham", source: "The Intelligent Investor, 1949", text: "The investor's primary interest lies in acquiring and holding suitable securities at suitable prices." },
  { id: "q057", author: "Benjamin Graham", source: "The Intelligent Investor, 1949", text: "Never buy a stock immediately after a substantial rise or sell one immediately after a substantial drop." },
  { id: "q058", author: "Benjamin Graham", source: "The Intelligent Investor, 1949", text: "Nearly everyone interested in common stocks wants to be told by someone else what he thinks the market is going to do. The demand being there, it must be supplied." },
  { id: "q059", author: "Benjamin Graham", source: "The Intelligent Investor, 1949", text: "A price decline is of no real importance to the bona fide investor unless it is either very substantial—say, more than a third from cost—or unless it reflects a known deterioration of consequence in the company's position." },
  { id: "q060", author: "Benjamin Graham", source: "The Intelligent Investor, 1949", text: "In a well-defined bear market many sound common stocks sell temporarily at extraordinary low prices." },
  { id: "q061", author: "Benjamin Graham", source: "The Intelligent Investor, 1949", text: "He is not trying to be smarter than his fellow investors but simply trying to be less irrational than the mass of speculators who insist on buying after the market advances and selling after it goes down." },
  { id: "q062", author: "Benjamin Graham", source: "The Intelligent Investor, 1949", text: "The true investor scarcely ever has to sell his shares, and at all other times he is free to disregard the current price quotation." },
  { id: "q063", author: "Benjamin Graham", source: "The Intelligent Investor, 1949", text: "…the investor who permits himself to be stampeded or unduly worried by unjustified market declines in his holdings is perversely transforming his basic advantage into a basic disadvantage." },
  { id: "q064", author: "Benjamin Graham", source: "The Intelligent Investor, 1949", text: "Basically, price fluctuations have only one significant meaning for the true investor. They provide him with an opportunity to buy wisely when prices fall sharply and to sell wisely when they advance a great deal." },
  { id: "q065", author: "Benjamin Graham", source: "The Intelligent Investor, 1949", text: "…he will do better if he forgets about the stock market and pays attention to his dividend returns and to the operating results of his companies." },
  { id: "q066", author: "Benjamin Graham", source: "The Intelligent Investor, 1949", text: "…the important and difficult part of sound investment, which hinges upon the investor's own temperament and attitude, is not much affected by the passing years." },
  { id: "q067", author: "Benjamin Graham", source: "The Intelligent Investor, 1949", text: "All the real money in investment will have to be made—as most of it has been in the past— not out of buying and selling but out of owning and holding securities, receiving interests and dividends therein, and benefiting from their long-term increases in value." },
  { id: "q068", author: "Benjamin Graham", source: "The Intelligent Investor, 1973", text: "Wall Street has a few prudent principles; the trouble is that they are always forgotten when they are most needed." },
  { id: "q069", author: "Benjamin Graham", source: "The Intelligent Investor, 1973", text: "Observation over many years has taught us that the chief losses to investors come from the purchase of low-quality securities at times of favorable business conditions." },
  { id: "q070", author: "Benjamin Graham", source: "The Intelligent Investor, 1973", text: "Investment is most intelligent when it is most businesslike." },
  { id: "q071", author: "Benjamin Graham", source: "The Intelligent Investor, 1973", text: "To achieve satisfactory investment results is easier than most people realize; to achieve superior results is harder than it looks." },
  { id: "q072", author: "Benjamin Graham", source: "The Intelligent Investor, 1973", text: "Do not let anyone else run your business." },

  // Charlie Munger
  { id: "q073", author: "Charlie Munger", source: "Daily Journal annual meeting, 2021", text: "You fix what can be fixed, and what can't be fixed you endure." },
  { id: "q074", author: "Charlie Munger", source: "Interview", text: "All successful investment involves trying to get into something where it's worth more than you're paying. That's what successful investing is." },
  { id: "q075", author: "Charlie Munger", source: "Berkshire Hathaway annual meeting, 1999", text: "The hard part of the process for most people is the first $100,000. If you have a standing start at zero, getting together $100,000 is a long struggle for most people." },
  { id: "q076", author: "Charlie Munger", source: "Poor Charlie's Almanack, 2005", text: "Our investment style has been given a name - focus investing - which implies ten holdings, not one hundred or four hundred." },

  // John C. Bogle
  { id: "q077", author: "John C. Bogle", source: "Speech at Trinity University, 2001", text: "The courage to press on regardless—regardless of whether we face calm seas or rough seas, and especially when the market storms howl around us—is the quintessential attribute of the successful investor." },
  { id: "q078", author: "John C. Bogle", source: "Bogleheads conference, 2018", text: "For God's sake, don't stop a program of regular investing because the market goes down." },
  { id: "q079", author: "John C. Bogle", source: "Gilbert Lecture, Princeton University, 2013", text: "Beating the market is a zero-sum game for investors. … The zero-sum game before costs becomes a loser's game after costs." },

  // Peter Lynch
  { id: "q080", author: "Peter Lynch", source: "Interview with Charlie Rose, 1993", text: "If you don't understand a company, if you can't explain it to a ten-year-old in 2 minutes or less, don't own it." },
  { id: "q081", author: "Peter Lynch", source: "Interview with Charlie Rose, 1997", text: "Corporate profits will be a lot higher 10 years from now. They'll be a lot higher 20 years from now. That's what you can rely on." },

  // Howard Marks
  { id: "q082", author: "Howard Marks", source: "The Most Important Thing Illuminated, 2013", text: "Investment success doesn't come from “buying good things”, but rather from “buying things well”." },
  { id: "q083", author: "Howard Marks", source: "Citywire Selector, 2019", text: "Market optimism that this time is different is misguided and dangerous." },

  // Sir John Templeton
  { id: "q084", author: "Sir John Templeton", source: "As quoted in The Four Pillars of Investing, 2002", text: "The four most expensive words in the English language are “this time it's different.”" },
  { id: "q085", author: "Sir John Templeton", source: "The Quotable Sir John", text: "Those who spend too much will eventually be owned by those who are thrifty." },

  // Philip Fisher
  { id: "q086", author: "Philip Fisher", source: "Paths to Wealth through Common Stocks, 1960", text: "Fortunes are sometimes made by those who appreciated the significance of what was happening early—before it was importantly reflected in changed quotations for individual stocks." },

  // John Maynard Keynes (ran King's College's endowment for over two decades)
  { id: "q087", author: "John Maynard Keynes", source: "The General Theory, 1936", text: "The social object of skilled investment should be to defeat the dark forces of time and ignorance which envelope our future." },

  // Paul Samuelson
  { id: "q088", author: "Paul Samuelson", source: "Newsweek, 1966", text: "The stock market has forecast nine of the last five recessions." },

  // J. P. Morgan
  { id: "q089", author: "J. P. Morgan", source: "Asked what the stock market will do; as quoted in The Intelligent Investor", text: "It will fluctuate." },

  // Burton Malkiel
  { id: "q090", author: "Burton Malkiel", source: "A Random Walk Down Wall Street, 2019", text: "It is not hard, really, to make money in the market." },
  { id: "q091", author: "Burton Malkiel", source: "A Random Walk Down Wall Street, 2019", text: "…an investor who simply buys and holds a broad-based portfolio of stocks can make reasonably generous long-run returns." },
  { id: "q092", author: "Burton Malkiel", source: "A Random Walk Down Wall Street, 2019", text: "What is hard to avoid is the alluring temptation to throw your money away on short, get-rich-quick speculative binges." },
  { id: "q093", author: "Burton Malkiel", source: "A Random Walk Down Wall Street, 2019", text: "The consistent losers in the market, from my personal experience, are those who are unable to resist being swept up in some kind of tulip-bulb craze." },
  { id: "q094", author: "Burton Malkiel", source: "A Random Walk Down Wall Street, 2019", text: "…history tells us that eventually all excessively exuberant markets succumb to the laws of gravity." },
  { id: "q095", author: "Burton Malkiel", source: "A Random Walk Down Wall Street, 2019", text: "The market eventually corrects any irrationality—albeit in its own slow, inexorable fashion." },
  { id: "q096", author: "Burton Malkiel", source: "A Random Walk Down Wall Street, 2019", text: "…I continue to believe that a broad-based total stock market index fund should be the core of everyone's portfolio." },
  { id: "q097", author: "Burton Malkiel", source: "A Random Walk Down Wall Street, 2019", text: "The harsh truth is that the most important driver in the growth of your assets is how much you save, and saving requires discipline." },
  { id: "q098", author: "Burton Malkiel", source: "A Random Walk Down Wall Street, 2019", text: "The longer an investor's holding period, the lower the likely variation in the asset's return." },
  { id: "q099", author: "Burton Malkiel", source: "A Random Walk Down Wall Street, 2019", text: "Investing requires work, make no mistake about it." },

  // Warren Buffett, once more
  { id: "q100", author: "Warren Buffett", source: "Berkshire Hathaway letter, 1987", text: "We have no ability to forecast interest rates and - maintaining our usual open-minded spirit - believe that no one else can." },
];
