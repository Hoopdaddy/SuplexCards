/* ═══════════════════════════════════════
   WRESTLERS DATA — shared between wrestlers.html and search.html
   Generated from wrestlers.html — do not edit directly here;
   edit the source in wrestlers.html and re-run extract script.
═══════════════════════════════════════ */
const PROMO_COLORS = {
  wwf:'#e8c84a', wwe:'#3498db', wcw:'#cc1f1f',
  ecw:'#888888', aew:'#9b59b6', tna:'#e67e22', indie:'#2ecc71'
};
const PROMO_LABELS = {
  wwf:'WWF', wwe:'WWE', wcw:'WCW',
  ecw:'ECW', aew:'AEW', tna:'TNA', indie:'Indie'
};

const WRESTLERS = [

  {
    name: 'Hulk Hogan',
    eras: ['vintage','golden','hof'],
    dotColor: '#e8c84a',
    keyNote: "The most important name in wrestling card history. His 1985 Topps WWF appearances anchor the most valuable set in the hobby. Any high-grade Hogan from the \'85 set is a legitimate graded card investment.",
    cards: [
            { year:1982, set:'Wrestling All-Stars Series A', num:'#2',  promo:'wwf', type:'rc',   tags:['RC','KEY','All-Stars','True RC'], note:'True rookie card. First Hulk Hogan card ever produced.', link:'early-wwf.html' },
      { year:1985, set:'Topps WWF',          num:'#1',  promo:'wwf', type:'base',  tags:['KEY','Iconic'], note:'The defining wrestling card. Near-mint copies sell in the hundreds.', link:'early-wwf.html' },
      { year:1986, set:'Topps WWF',          num:'#1',  promo:'wwf', type:'base',  tags:[], link:'early-wwf.html' },
      { year:1987, set:'Topps WWF Superstars',num:'#1', promo:'wwf', type:'base',  tags:[], link:'early-wwf.html' },
      { year:1988, set:'Topps WWF',          num:'#1',  promo:'wwf', type:'base',  tags:[] },
      { year:1989, set:'Topps WWF',          num:'#1',  promo:'wwf', type:'base',  tags:[], link:'early-wwf.html' },
      { year:1990, set:'Classic WWF Series I',num:'#68',promo:'wwf', type:'base',  tags:[], link:'golden-age.html' },
      { year:1995, set:'Cardz WCW Main Event',num:'#1', promo:'wcw', type:'base',  tags:['WCW Turn'], note: "Hogan\'s first WCW card after the heel turn", link:'golden-age.html' },
      { year:1996, set:'Topps WCW/nWo',      num:'—',  promo:'wcw', type:'base',  tags:['nWo','Hollywood'] },
      { year:1999, set:'Topps WCW Nitro',    num:'—',  promo:'wcw', type:'base',  tags:[], link:'golden-age.html' },
    ]
  },

  {
    name: 'Randy "Macho Man" Savage',
    eras: ['vintage','golden','hof'],
    dotColor: '#e8c84a',
    keyNote: "Savage\'s 1987 Topps RC featuring Miss Elizabeth is his true rookie card — a landmark from the golden era of WWF cards.",
    cards: [
      { year:1987, set:'1987 Topps WWF',     num:'#7',  promo:'wwf', type:'rc',   tags:['RC','KEY'], note:'True Savage RC with Miss Elizabeth. Landmark card from the 75-card set.', link:'early-wwf.html' },
      { year:1986, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
      { year:1987, set:'Topps WWF Superstars',num:'—',  promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
      { year:1990, set:'Classic WWF Series I',num:'#2', promo:'wwf', type:'base', tags:[], link:'golden-age.html' },
      { year:1995, set:'Cardz WCW Main Event',num:'—',  promo:'wcw', type:'base', tags:['WCW'], link:'golden-age.html' },
    ]
  },

  {
    name: 'The Undertaker',
    eras: ['golden','attitude','modern','hof'],
    dotColor: '#cc1f1f',
    keyNote: "The Undertaker\'s first card is #57 in the 1990 Classic WWF Series I — a genuine RC that most collectors overlook. Thirty-plus years of unbroken card history, spanning every WWE era. His retirement makes all early Taker cards significantly more important going forward.",
    cards: [
      { year:1990, set:'Classic WWF Series I', num:'#57', promo:'wwf', type:'rc', tags:['RC','KEY'], note:'First Undertaker card ever produced. Significantly undervalued vs. his historical importance.', link:'golden-age.html' },
      { year:1994, set:'Action Packed WWF', num:'—', promo:'wwf', type:'base', tags:['Embossed'], note:'Embossed gold foil surface. One of the most visually striking 90s wrestling cards.', link:'golden-age.html' },
      { year:1994, set:'Action Packed WWF', num:'—', promo:'wwf', type:'insert', tags:['24KT Gold'], note:'24 karat gold insert — ultra-premium for its era.', link:'golden-age.html' },
      { year:2001, set:'Fleer WWF Raw Is War', num:'WBA', promo:'wwf', type:'auto', tags:['On-Card','KEY'], note:'War Booty Autograph — one of the earliest certified Undertaker autos. Extremely scarce.', link:'fleer-era.html' },
      { year:2006, set:'2006 Topps WWE Insider', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker', link:'first-topps.html' },
      { year:2007, set:'2007 Topps WWE Action', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker vs. Batista', link:'first-topps.html' },
      { year:2011, set:'2011 WWE Champions', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker Defeats Shawn Michaels', link:'first-topps.html' },
      { year:2011, set:'2011 WWE Champions', num:'—', promo:'wwe', type:'base', tags:[], note:'Kane Buries Undertaker', link:'first-topps.html' },
      { year:2011, set:'2011 WWE Champions', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker Defeats Triple H', link:'first-topps.html' },
      { year:2013, set:'2013 Topps WWE: Best of WWE', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker Returns to Fight Alongside his Half-Brother Kane', link:'first-topps.html' },
      { year:2013, set:'2013 Topps WWE: Best of WWE', num:'—', promo:'wwe', type:'base', tags:[], note:'CM Punk Defeats Randy Orton, Big Show and Sheamus to Become Undertaker\'s WrestleMania Opponent', link:'first-topps.html' },
      { year:2013, set:'2013 Topps WWE: Best of WWE', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker Honors Paul Bearer', link:'first-topps.html' },
      { year:2013, set:'2013 Topps WWE: Best of WWE', num:'—', promo:'wwe', type:'base', tags:[], note:'CM Punk Disrespects Undertaker and the Memory of Paul Bearer', link:'first-topps.html' },
      { year:2013, set:'2013 Topps WWE: Best of WWE', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker Defeats CM Punk for 21-0 at WrestleMania', link:'first-topps.html' },
      { year:2013, set:'2013 Topps WWE: Best of WWE', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker', link:'first-topps.html' },
      { year:2013, set:'2013 Topps WWE: Best of WWE', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker: "Rest in Peace."', link:'first-topps.html' },
      { year:2013, set:'2013 Topps WWE: Best of WWE', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker: Tombstone', link:'first-topps.html' },
      { year:2013, set:'2013 Topps WWE: Best of WWE', num:'—', promo:'wwe', type:'base', tags:[], note:'Shawn Michaels vs. Undertaker', link:'first-topps.html' },
      { year:2013, set:'2013 Topps WWE: Best of WWE', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker vs. Triple H', link:'first-topps.html' },
      { year:2013, set:'2013 Topps WWE: Best of WWE', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker vs. Kane', link:'first-topps.html' },
      { year:2013, set:'2013 Topps WWE: Best of WWE', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker Ends Shawn Michaels\'s Career at WrestleMania 26', link:'first-topps.html' },
      { year:2013, set:'2013 Topps WWE', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker', link:'first-topps.html' },
      { year:2013, set:'2013 Topps WWE', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker (Action)', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker Returns', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Paul Heyman Challenges Undertaker on Behalf of Brock Lesnar', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker Defeats Brock Lesnar at WrestleMania 30... or Does He?', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker vs. Brock Lesnar is Announced for WrestleMania 30', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Brock Lesnar Attacks The Undertaker', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker Defeats Brock Lesnar... Wait, No He Doesn\'t', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker (WrestleMania 9)', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker vs. Batista (WrestleMania 23)', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker vs. Triple H (WrestleMania 27)', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker (WrestleMania 7)', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker (WrestleMania 12)', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker (WrestleMania 18)', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker (WrestleMania 30)', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker (21-0 Promo)', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'auto', tags:[], note:'Undertaker', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'relic', tags:[], note:'Undertaker (Dual Swatch – Pants and Hat)', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker (Action)', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker vs. Batista (WM 23)', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'relic', tags:[], note:'Undertaker', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Chrome', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Chrome', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker (Action)', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Chrome', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker (Promo)', link:'first-topps.html' },
      { year:2014, set:'2014 Topps WWE Chrome', num:'—', promo:'wwe', type:'relic', tags:[], note:'Undertaker', link:'first-topps.html' },
      { year:2015, set:'2015 Topps WWE', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker', link:'first-topps.html' },
      { year:2015, set:'2015 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker – Defeats Bray Wyatt', link:'first-topps.html' },
      { year:2015, set:'2015 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Faces Undertaker in a No Holds Barred Match', link:'first-topps.html' },
      { year:2015, set:'2015 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Faces Undertaker in a Hell in a Cell Match', link:'first-topps.html' },
      { year:2015, set:'2015 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker Loses at WrestleMania', link:'first-topps.html' },
      { year:2015, set:'2015 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'base', tags:[], note:'Flair vs. Undertaker', link:'first-topps.html' },
      { year:2015, set:'2015 Topps WWE Chrome', num:'—', promo:'wwe', type:'base', tags:[], note:'Defeats Undertaker for the WWE Championship', link:'first-topps.html' },
      { year:2016, set:'2016 WWE Topps Trading Cards', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker', link:'first-topps.html' },
      { year:2016, set:'2016 WWE Topps Trading Cards', num:'—', promo:'wwe', type:'base', tags:[], note:'Defeats Undertaker for the WWE Championship', link:'first-topps.html' },
      { year:2016, set:'2016 WWE Topps Trading Cards', num:'—', promo:'wwe', type:'base', tags:[], note:'Defeats Undertaker in a Biker Chain Match', link:'first-topps.html' },
      { year:2016, set:'2016 WWE Topps Trading Cards', num:'—', promo:'wwe', type:'base', tags:[], note:'Wins the World Tag Team Championship with Undertaker', link:'first-topps.html' },
      { year:2016, set:'2016 WWE Topps Undisputed', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker', link:'first-topps.html' },
      { year:2017, set:'Topps WWE Legends', num:'A-UT', promo:'wwe', type:'auto', tags:['On-Card','/199'], note:'Legends certified auto /199. Blue /50, Silver /25, Gold /10, Red 1/1 parallels.', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Countdown to WrestleMania 33 On Demand Set', num:'—', promo:'wwe', type:'base', tags:[], note:'Roman Reigns vs. The Undertaker', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 1 #1', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 1 #2', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 1 #3', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 1 #4', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 1 #5', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 1 #6', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 1 #7', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 1 #8', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 1 #9', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 1 #10', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Heritage', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Heritage', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 3 #1', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Heritage', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 3 #2', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Heritage', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 3 #3', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Heritage', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 3 #4', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Heritage', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 3 #5', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Heritage', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 3 #6', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Heritage', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 3 #7', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Heritage', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 3 #8', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Heritage', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 3 #9', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Heritage', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 3 #10', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 2 #1', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 2 #2', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 2 #3', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 2 #4', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 2 #5', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 2 #6', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 2 #7', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 2 #8', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 2 #9', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 2 #10', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Then, Now, Forever', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Then, Now, Forever', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 4 #1', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Then, Now, Forever', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 4 #2', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Then, Now, Forever', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 4 #3', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Then, Now, Forever', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 4 #4', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Then, Now, Forever', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 4 #5', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Then, Now, Forever', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 4 #6', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Then, Now, Forever', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 4 #7', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Then, Now, Forever', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 4 #8', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Then, Now, Forever', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 4 #9', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Then, Now, Forever', num:'—', promo:'wwe', type:'insert', tags:[], note:'Undertaker Tribute Part 4 #10', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Legends', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Undisputed', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Undisputed', num:'—', promo:'wwe', type:'relic', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2017, set:'2017 Topps WWE Undisputed', num:'—', promo:'wwe', type:'auto', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Heritage', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker vs. John Cena at WrestleMania 34 announced', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker defeats John Cena at WM34', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Then Now Forever', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Then Now Forever', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker (variation)', link:'first-topps.html' },
      { year:2018, set:'2018 WWE Topps Now', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker defeats John Cena at WrestleMania 34', link:'first-topps.html' },
      { year:2018, set:'2018 WWE Topps Now', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker returns and delivers a chokeslam to Braun Strowman at TLC', link:'first-topps.html' },
      { year:2018, set:'2018 WWE Topps Now', num:'—', promo:'wwe', type:'relic', tags:[], note:'The Undertaker — Mat Relic /25', link:'first-topps.html' },
      { year:2018, set:'2018 WWE Topps Now', num:'—', promo:'wwe', type:'relic', tags:[], note:'The Undertaker — Gold Mat Relic 1/1', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker (variation)', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Trading Cards', num:'—', promo:'wwe', type:'auto', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Legends', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Legends', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker / Bray Wyatt', link:'first-topps.html' },
      { year:2018, set:'2018 WWE Topps Elite', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Undisputed', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Undisputed', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker (2007)', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Undisputed', num:'—', promo:'wwe', type:'base', tags:[], note:'Hulk Hogan / Undertaker (1991)', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Undisputed', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker / Yokozuna (1994)', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Undisputed', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker / Mankind (1998)', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Undisputed', num:'—', promo:'wwe', type:'relic', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Undisputed', num:'—', promo:'wwe', type:'auto', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2018, set:'2018 Topps WWE Undisputed', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker / Shawn Michaels', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'John Cena Asks Undertaker for One More Match — Raw', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Undertaker Defeats John Cena — WrestleMania 34', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'auto', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker — WrestleMania 34', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'relic', tags:[], note:'The Undertaker — WrestleMania 34', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SmackDown Live', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SmackDown Live', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker & Big Show def. The Rock & Mankind in a Buried Alive Match', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SmackDown Live', num:'—', promo:'wwe', type:'base', tags:[], note:'WWE Champion Kurt Angle vs. The Undertaker', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SmackDown Live', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker def. John Cena', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SmackDown Live', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker def. Randy Orton', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SmackDown Live', num:'—', promo:'wwe', type:'base', tags:[], note:'Shawn Michaels Mocks The Undertaker', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SmackDown Live', num:'—', promo:'wwe', type:'base', tags:[], note:'Jeff Hardy def. The Undertaker in an Extreme Rules Match', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SmackDown Live', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker — Tombstone Piledriver', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SmackDown Live', num:'—', promo:'wwe', type:'relic', tags:[], note:'The Undertaker — SmackDown LIVE 1000', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SummerSlam', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker — SummerSlam 2008', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SummerSlam', num:'—', promo:'wwe', type:'base', tags:[], note:'8-18-96 Mankind def. The Undertaker in a Boiler Room Brawl Match', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SummerSlam', num:'—', promo:'wwe', type:'base', tags:[], note:'8-30-98 Champion "Stone Cold" Steve Austin def. The Undertaker', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SummerSlam', num:'—', promo:'wwe', type:'base', tags:[], note:'8-15-10 World Heavyweight Champion Kane Destroys Rey Mysterio and The Undertaker', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SummerSlam', num:'—', promo:'wwe', type:'base', tags:[], note:'8-29-94 The Undertaker Returns to Eliminate His Imposter', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SummerSlam', num:'—', promo:'wwe', type:'base', tags:[], note:'8-27-95 The Undertaker def. Kama in a Casket Match', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SummerSlam', num:'—', promo:'wwe', type:'base', tags:[], note:'8-17-08 The Undertaker def. Edge in a Hell In A Cell Match', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SummerSlam', num:'—', promo:'wwe', type:'base', tags:[], note:'8-23-15 The Undertaker def. Brock Lesnar', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE SummerSlam', num:'—', promo:'wwe', type:'base', tags:[], note:'8-3-97 Bret "Hit Man" Hart def. The Undertaker to Win the Championship', link:'first-topps.html' },
      { year:2019, set:'2019 WWE Topps Industry Conference', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2019, set:'2019 WWE Topps Now', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker def. Goldberg (PR-31)', link:'first-topps.html' },
      { year:2019, set:'2019 WWE Topps Now', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker and Roman Reigns def. Shane McMahon and Drew McIntyre (PR-58)', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE Transcendent', num:'—', promo:'wwe', type:'auto', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE Transcendent', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE Undisputed', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2019, set:'2019 Topps WWE Undisputed', num:'—', promo:'wwe', type:'auto', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2020, set:'2020 Topps Countdown to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker def. Shawn Michaels (PR-129)', link:'first-topps.html' },
      { year:2020, set:'2020 Topps Countdown to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker def. Triple H in a Hell In A Cell Match (PR-123)', link:'first-topps.html' },
      { year:2020, set:'2020 Topps Countdown to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Brock Lesnar def. The Undertaker (PR-106)', link:'first-topps.html' },
      { year:2020, set:'2020 WWE Topps Finest', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker – WWE', link:'first-topps.html' },
      { year:2020, set:'2020 WWE Topps Finest', num:'—', promo:'wwe', type:'relic', tags:[], note:'The Undertaker – Raw 2014', link:'first-topps.html' },
      { year:2020, set:'2020 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'Triple H def. The Undertaker – Super Show-Down', link:'first-topps.html' },
      { year:2020, set:'2020 Topps WWE Road to WrestleMania', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2020, set:'2020 WWE Topps Now', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker wins the Tuwaiq Trophy Gauntlet Match (PR-77)', link:'first-topps.html' },
      { year:2020, set:'2020 WWE Topps Now', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker def. AJ Styles in a Boneyard Match (PR-141)', link:'first-topps.html' },
      { year:2020, set:'2020 WWE Topps Now', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker delivers his final farewell to the WWE Universe (PR-736)', link:'first-topps.html' },
      { year:2020, set:'2020–2021 Topps This Moment In WWE History', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker Defeats Jeff Hardy In A Ladder Match', link:'first-topps.html' },
      { year:2020, set:'2020 Topps WWE Chrome', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker – WWE', link:'first-topps.html' },
      { year:2020, set:'2020 Topps WWE Chrome', num:'—', promo:'wwe', type:'base', tags:[], note:'Finn Balor / The Undertaker', link:'first-topps.html' },
      { year:2020, set:'2020 Topps WWE Transcendent', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker – WWE', link:'first-topps.html' },
      { year:2020, set:'2020 Topps WWE Transcendent', num:'—', promo:'wwe', type:'base', tags:[], note:'John Cena Takes on The Undertaker – Vengeance 2003', link:'first-topps.html' },
      { year:2020, set:'2020 Topps WWE Transcendent', num:'—', promo:'wwe', type:'auto', tags:[], note:'The Undertaker – WWE', link:'first-topps.html' },
      { year:2020, set:'2020 Topps WWE Transcendent', num:'—', promo:'wwe', type:'base', tags:[], note:'50 subjects including: AJ Styles, Alexa Bliss, Andrade, Angel Garza, Asuka, Batista, Bayley, Becky Lynch, Braun Strowman, "The Fiend" Bray Wyatt, Bret Hart, Brock Lesnar, Charlotte Flair, Eddie Guerrero, Ember Moon, Finn Balor, Goldberg, Hulk Hogan, Jeff Hardy, John Cena, Kairi Sane, Kane, Keith Lee, Kevin Owens, Kofi Kingston, Lacey Evans, Lita, Matt Riddle, Mustafa Ali, Pete Dunne, Randy Orton, "Macho Man" Randy Savage, Ricochet, "Rowdy" Roddy Piper, Roman Reigns, Ronda Rousey, Sami Zayn, Samoa Joe, Sasha Banks, Seth Rollins, Shawn Michaels, Shayna Baszler, Shinsuke Nakamura, Sting, "Stone Cold" Steve Austin, The Miz, The Rock, Triple H, Ultimate Warrior, The Undertaker', link:'first-topps.html' },
      { year:2020, set:'2020 Topps WWE Transcendent', num:'—', promo:'wwe', type:'base', tags:[], note:'Autographed Funko Pop WWE Figure (Becky Lynch, Bret Hart, Shawn Michaels, The Miz, The Undertaker)', link:'first-topps.html' },
      { year:2020, set:'2020 Topps WWE Undisputed', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2021, set:'Topps Chrome WWE', num:'#20', promo:'wwe', type:'base', tags:['KEY','Final Farewell'], note:'Final Chrome appearance before retirement.', link:'first-topps.html' },
      { year:2021, set:'2021 Topps WWE Heritage', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2021, set:'2021 Topps WWE Chrome', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker Drags Diesel Down into the Unknown', link:'first-topps.html' },
      { year:2021, set:'2021 Topps WWE Chrome', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker Rises from the First Buried Alive Match', link:'first-topps.html' },
      { year:2021, set:'2021 Topps WWE Chrome', num:'—', promo:'wwe', type:'base', tags:[], note:'Chaos Erupts Between Shawn Michaels and The Undertaker', link:'first-topps.html' },
      { year:2021, set:'2021 Topps WWE Chrome', num:'—', promo:'wwe', type:'base', tags:[], note:'Shawn Michaels def. The Undertaker in the First Hell In A Cell Match', link:'first-topps.html' },
      { year:2021, set:'2021 Topps WWE Chrome', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker def. Kane in an Inferno Match', link:'first-topps.html' },
      { year:2021, set:'2021 Topps WWE Chrome', num:'—', promo:'wwe', type:'base', tags:[], note:'"Stone Cold" Steve Austin & The Undertaker Become WWE Tag Team Champions', link:'first-topps.html' },
      { year:2021, set:'2021 Topps WWE Transcendent', num:'—', promo:'wwe', type:'auto', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2021, set:'2021 Topps WWE Transcendent', num:'—', promo:'wwe', type:'base', tags:[], note:'Ric Flair Intrudes on Undertaker\'s Yard', link:'first-topps.html' },
      { year:2021, set:'2021 Topps WWE Transcendent', num:'—', promo:'wwe', type:'base', tags:[], note:'50 subjects: Alexa Bliss, Asuka, Batista, Bayley, Becky Lynch, Booker T, Braun Strowman, Bray Wyatt, Bret Hart, Charlotte Flair, Daniel Bryan, Drew McIntyre, Eddie Guerrero, Edge, Finn Balor, Goldberg, Hulk Hogan, Jeff Hardy, John Cena, Kane, Keith Lee, Kevin Owens, King Corbin, "Macho Man" Randy Savage, Mick Foley, "Million Dollar Man" Ted DiBiase, Mr. Perfect, Nia Jax, Otis, Randy Orton, Razor Ramon, Rey Mysterio, Ric Flair, Riddle, Rikishi, Roman Reigns, "Rowdy" Roddy Piper, Sasha Banks, Sami Zayn, Seth Rollins, Shawn Michaels, Sheamus, Sgt. Slaughter, Shinsuke Nakamura, Stone Cold Steve Austin, The New Day, The Rock, Ultimate Warrior, The Undertaker', link:'first-topps.html' },
      { year:2021, set:'2021 Topps WWE Undisputed', num:'—', promo:'wwe', type:'base', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2021, set:'2021 Topps WWE Undisputed', num:'—', promo:'wwe', type:'auto', tags:[], note:'The Undertaker', link:'first-topps.html' },
      { year:2021, set:'2021 Topps WWE Undisputed', num:'—', promo:'wwe', type:'base', tags:[], note:'Kane / The Undertaker', link:'first-topps.html' },
      { year:2022, set:'2022 Panini Prizm WWE', num:'—', promo:'wwe', type:'auto', tags:['Prizm Auto'], note:'Prizm-era certified autograph — short-printed.', link:'panini-era.html' },
      { year:2023, set:'2023 Panini Impeccable WWE', num:'—', promo:'wwe', type:'auto', tags:['On-Card','/49'], note:'Impeccable certified auto /49.', link:'panini-era.html' },
      { year:2025, set:'2025 Topps Chrome WWE', num:'CLA-TK', promo:'wwe', type:'auto', tags:['Chrome Legends Auto'], note:'Chrome Legends Autograph.', link:'current-topps.html' },
      { year:2025, set:'2025 Topps Chrome WWE', num:'HOF-UT', promo:'wwe', type:'auto', tags:['HOF Auto'], note:'Hall of Fame Autograph.', link:'current-topps.html' },
      { year:2025, set:'2025 Topps Chrome WWE', num:'AG-UTK', promo:'wwe', type:'auto', tags:['Allen & Ginter Auto'], note:'Allen & Ginter insert autograph.', link:'current-topps.html' },
      { year:2025, set:'2025 Topps Chrome WWE', num:'EMB-UT', promo:'wwe', type:'auto', tags:['Embedded Auto'], note:'Embedded autograph insert.', link:'current-topps.html' },
      { year:2025, set:'2025 Topps Chrome WWE', num:'FT-UK', promo:'wwe', type:'auto', tags:['Family Tree','Dual Auto'], note:'Family Tree dual auto — Undertaker / Kane.', link:'current-topps.html' },
      { year:2025, set:'2025 Topps Universe WWE', num:'LGA-UND', promo:'wwe', type:'auto', tags:['Legends Auto'], note:'Legends Gold Autograph.', link:'current-topps.html' },
      { year:2025, set:'2025 Topps Universe WWE', num:'WAU-UND', promo:'wwe', type:'relic', tags:['WWE Authentics'], note:'WWE Authentics patch card.', link:'current-topps.html' },
      { year:2025, set:'2025 Topps Universe WWE', num:'RSR-UND', promo:'wwe', type:'relic', tags:['Ringside Relics'], note:'Ringside Relics patch card.', link:'current-topps.html' },
      { year:2026, set:'2026 Topps Decades: 90s Edition WWE', num:'5A', promo:'wwe', type:'auto', tags:['Enter The Warzone Auto'], note:'Autographs — Enter The Warzone.', link:'current-topps.html' },
      { year:2026, set:'2026 Topps Decades: 90s Edition WWE', num:'90A', promo:'wwe', type:'auto', tags:['Undisputed Champions Auto'], note:'Autographs — Undisputed Champions.', link:'current-topps.html' },
      { year:2026, set:'2026 Topps Decades: 90s Edition WWE', num:'154A', promo:'wwe', type:'auto', tags:['Champion v Champion','Dual Auto'], note:'Autographs — Champion v Champion dual auto with Kane.', link:'current-topps.html' },
      { year:2026, set:'2026 Topps Decades: 90s Edition WWE', num:'156A', promo:'wwe', type:'auto', tags:['Triple Threat','Triple Auto'], note:'Autographs — Triple Threat: Kane, Stone Cold Steve Austin, Undertaker.', link:'current-topps.html' },
    ]
  },

  {
    name: 'Shawn Michaels',
    eras: ['golden','attitude','hof'],
    dotColor: '#e8c84a',
    keyNote: "HBK\'s earliest cards as part of the Rockers (1985 Topps) predate his singles run. His 1990 Classic WWF card is among the most sought-after in that set. The 1994 Action Packed version with its embossed surface is genuinely striking.",
    cards: [
      { year:1985, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:['Rockers','Early'], note:'As part of The Rockers — earliest Michaels card', link:'early-wwf.html' },
      { year:1990, set:'Classic WWF Series I',num:'#25',promo:'wwf', type:'rc',   tags:['RC','KEY'], note:'First solo HBK card. Key card from the Classic set.', link:'golden-age.html' },
      { year:1994, set:'Action Packed WWF',  num:'—',   promo:'wwf', type:'base', tags:['Embossed','On-Card Auto'], link:'golden-age.html' },
      { year:2000, set:'Fleer WWF WrestleMania',num:'—',promo:'wwf', type:'base', tags:[], link:'golden-age.html' },
      { year:2005, set:'Topps WWE Heritage', num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2012, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
    ]
  },

  {
    name: 'Bret "Hitman" Hart',
    eras: ['golden','attitude','hof'],
    dotColor: '#cc1f1f',
    keyNote: "Hart's 1987 Topps #1 RC is his true first card — the card #1 of the landmark 75-card set. Criminally undervalued relative to other HOF RCs from the era.",
    cards: [
      { year:1987, set:'1987 Topps WWF',      num:'#1',  promo:'wwf', type:'rc',   tags:['RC','KEY'], note:'True Hart RC. Card #1 of the landmark 75-card Topps WWF set.', link:'early-wwf.html' },
      { year:1990, set:'Classic WWF Series I',num:'—',  promo:'wwf', type:'base', tags:['Hart Foundation'], link:'golden-age.html' },
      { year:1994, set:'Action Packed WWF',  num:'—',   promo:'wwf', type:'base', tags:['Embossed','Champion'], link:'golden-age.html' },
      { year:1999, set:'Topps WCW Nitro',    num:'—',   promo:'wcw', type:'base', tags:['WCW'], link:'golden-age.html' },
      { year:2005, set:'Topps WWE Heritage', num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2012, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:['Legend'], link:'first-topps.html' },
    ]
  },

  {
    name: 'Steve Austin',
    eras: ['golden','attitude','hof'],
    dotColor: '#cc1f1f',
    keyNote: "Stone Cold\'s #13 in the 1995 Cardz WCW Main Event set is one of the most important and undervalued rookie cards in the hobby — produced before anyone knew who Steve Austin would become. Get this card before the market wakes up.",
    cards: [
      { year:1995, set:'Cardz WCW Main Event',num:'#13',promo:'wcw', type:'rc',   tags:['RC','KEY','SLEEPER'], note:'The most undervalued RC in the hobby. Pre-fame Steve Austin.', link:'golden-age.html' },
      { year:1999, set:'Topps WCW/nWo Nitro',num:'—',  promo:'wcw', type:'base', tags:['WCW'], link:'golden-age.html' },
      { year:2000, set:'Fleer WWF WrestleMania',num:'—',promo:'wwf', type:'base', tags:['KEY'], link:'golden-age.html' },
      { year:2002, set:'Fleer WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'fleer-era.html' },
      { year:2005, set:'Topps WWE Heritage', num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2012, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:['Legend'], link:'first-topps.html' },
    ]
  },

  {
    name: 'The Rock',
    eras: ['attitude','hof'],
    dotColor: '#e67e22',
    keyNote: "Dwayne Johnson\'s first Topps card comes in the 2000 Fleer WWF WrestleMania set during his absolute peak. A Hollywood career followed — and these cards are still cheap compared to where they\'ll be in a decade.",
    cards: [
      { year:2000, set:'Fleer WWF WrestleMania',num:'—',promo:'wwf', type:'rc',   tags:['RC','KEY'], note:'First major Rock card. Attitude Era peak captured.', link:'golden-age.html' },
      { year:2002, set:'Fleer WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'fleer-era.html' },
      { year:2005, set:'Topps WWE Heritage', num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2012, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2024, set:'Panini Prizm WWE',   num:'—',   promo:'wwe', type:'base', tags:['Return','Final Boss'], link:'panini-era.html' },
    ]
  },

  {
    name: 'Goldberg',
    eras: ['golden','hof'],
    dotColor: '#cc1f1f',
    keyNote: "Goldberg\'s #1 in the 1999 Topps WCW/nWo Nitro set captures him during his legendary undefeated streak. One of WCW\'s only true crossover stars, and his cards are among the most undervalued in the WCW catalog.",
    cards: [
      { year:1998, set:'Topps WCW/nWo',      num:'#1',  promo:'wcw', type:'rc',   tags:['RC','KEY'], note:'First Goldberg card. Undefeated streak era.', link:'golden-age.html' },
      { year:1999, set:'Topps WCW/nWo Nitro',num:'#1',  promo:'wcw', type:'base', tags:['KEY'], link:'golden-age.html' },
      { year:2002, set:'Fleer WWE',          num:'—',   promo:'wwe', type:'base', tags:['First WWE card'], link:'fleer-era.html' },
      { year:2012, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'—',   promo:'wwe', type:'base', tags:['Legend'], link:'panini-era.html' },
    ]
  },

  {
    name: 'Sting',
    eras: ['golden','aew','hof'],
    dotColor: '#3498db',
    keyNote: "Sting\'s WCW card history is rich and his AEW debut card from Upper Deck 2021 is a legitimate key — his first card in a new promotion after an iconic career. The retirement makes all Sting cards more significant going forward.",
    cards: [
      { year:1995, set:'Cardz WCW Main Event',num:'—',  promo:'wcw', type:'base', tags:[], link:'golden-age.html' },
      { year:1999, set:'Topps WCW/nWo Nitro',num:'—',  promo:'wcw', type:'base', tags:[], link:'golden-age.html' },
      { year:2021, set:'Upper Deck AEW S1',  num:'#7',  promo:'aew', type:'rc',   tags:['RC','KEY','AEW Debut'], note:'First AEW Sting card. Career-defining appearance.', link:'aew-cards.html' },
      { year:2022, set:'Upper Deck AEW',     num:'—',   promo:'aew', type:'base', tags:[], link:'aew-cards.html' },
    ]
  },

  {
    name: 'John Cena',
    eras: ['modern','hof'],
    dotColor: '#3498db',
    keyNote: "Cena\'s 2002 Fleer WWE RC is the most important rookie card from the Fleer era. As the face of WWE for over a decade, his cards span every modern product. His 2025 retirement makes early Cena cards more significant.",
    cards: [
      { year:2002, set:'Fleer WWE',          num:'—',   promo:'wwe', type:'rc',   tags:['RC','KEY'], note:'The defining Fleer WWE RC. Get graded copies now.', link:'fleer-era.html' },
      { year:2003, set:'Fleer WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'fleer-era.html' },
      { year:2005, set:'Topps WWE Heritage', num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2008, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2012, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'—',   promo:'wwe', type:'base', tags:[], link:'panini-era.html' },
      { year:2025, set:'Topps WWE',          num:'#45', promo:'wwe', type:'base', tags:['Legend','Final Run'], link:'current-topps.html' },
    ]
  },

  {
    name: 'Randy Orton',
    eras: ['modern'],
    dotColor: '#3498db',
    keyNote: "Orton\'s 2002 Fleer WWE RC comes the same year as Cena and Batista — the most valuable rookie class of the Fleer era. The Viper\'s cards have quietly appreciated as his legend grows.",
    cards: [
      { year:2002, set:'Fleer WWE',          num:'—',   promo:'wwe', type:'rc',   tags:['RC','KEY'], note:'Same RC class as Cena, Batista, Brock. Fleer gold.', link:'fleer-era.html' },
      { year:2005, set:'Topps WWE Heritage', num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2012, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'#12', promo:'wwe', type:'base', tags:[], link:'panini-era.html' },
    ]
  },

  {
    name: 'Batista',
    eras: ['modern','hof'],
    dotColor: '#3498db',
    keyNote: "The Animal\'s 2002 Fleer WWE RC is part of one of the greatest rookie classes in wrestling card history. Drax the Destroyer\'s crossover fame makes these cards appealing to sports AND entertainment collectors.",
    cards: [
      { year:2002, set:'Fleer WWE',          num:'—',   promo:'wwe', type:'rc',   tags:['RC','KEY'], note:'Part of the legendary 2002 Fleer rookie class.', link:'fleer-era.html' },
      { year:2005, set:'Topps WWE Heritage', num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2012, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:['Legend'], link:'first-topps.html' },
    ]
  },

  {
    name: 'Brock Lesnar',
    eras: ['modern'],
    dotColor: '#cc1f1f',
    keyNote: "Lesnar\'s 2002 Fleer WWE RC is arguably the most valuable card from that set. His Beast Incarnate mystique drives card demand — he appears infrequently, commands premium prices, and his cards have consistently appreciated.",
    cards: [
      { year:2002, set:'Fleer WWE',          num:'—',   promo:'wwe', type:'rc',   tags:['RC','KEY'], note:'Most valuable RC in the 2002 Fleer set. The Beast.', link:'fleer-era.html' },
      { year:2003, set:'Fleer WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'fleer-era.html' },
      { year:2012, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'#3',  promo:'wwe', type:'base', tags:[], link:'panini-era.html' },
      { year:2023, set:'Panini Prizm WWE',   num:'—',   promo:'wwe', type:'base', tags:[], link:'panini-era.html' },
    ]
  },

  {
    name: 'CM Punk',
    eras: ['modern','aew','indie'],
    dotColor: '#9b59b6',
    keyNote: "Best in the World on cardboard too. Punk\'s card history spans ROH indie cards (ultra-rare), WWE Topps cards, AEW Upper Deck RCs, and his return-era Panini Prizm. The AEW RC is a historically significant card. ROH cards are genuine rarities.",
    cards: [
      { year:2005, set:'ROH Trading Cards',  num:'—',   promo:'indie',type:'rc',  tags:['RC','INDIE RC','RARE'], note:'Extremely rare ROH card. Pre-fame, historically important.', link:'independent.html' },
      { year:2010, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2012, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:['Champion','KEY'], link:'first-topps.html' },
      { year:2021, set:'Upper Deck AEW S1',  num:'#1',  promo:'aew', type:'rc',   tags:['RC','KEY','AEW Return'], note:'The AEW RC. Best in the World returns to wrestling.', link:'aew-cards.html' },
      { year:2022, set:'Upper Deck AEW',     num:'—',   promo:'aew', type:'base', tags:[], link:'aew-cards.html' },
      { year:2022, set:'Leaf AEW Autographs',num:'A-CP',promo:'aew', type:'auto', tags:['On-Card Auto'], link:'aew-cards.html' },
      { year:2023, set:'Panini Prizm WWE',   num:'#2',  promo:'wwe', type:'base', tags:['KEY','WWE Return'], note:'First WWE Prizm card in nearly a decade.', link:'panini-era.html' },
      { year:2024, set:'Panini Prizm WWE',   num:'—',   promo:'wwe', type:'base', tags:[], link:'panini-era.html' },
    ]
  },

  {
    name: 'Roman Reigns',
    eras: ['modern'],
    dotColor: '#3498db',
    keyNote: "The Tribal Chief\'s heel run is an all-time great character arc and his cards reflect it. The 2022 Panini Prizm Roman Reigns in full Tribal Chief regalia is a piece of the greatest WWE character of his generation.",
    cards: [
      { year:2013, set:'Topps WWE',          num:'—',   promo:'wwe', type:'rc',   tags:['RC','Shield'], note:'Shield-era RC. Reigns, Ambrose, and Rollins in same set.', link:'first-topps.html' },
      { year:2016, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2021, set:'Topps Chrome WWE',   num:'#1',  promo:'wwe', type:'base', tags:['Tribal Chief'], link:'first-topps.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'#1',  promo:'wwe', type:'base', tags:['KEY'], link:'panini-era.html' },
      { year:2023, set:'Panini Prizm WWE',   num:'#1',  promo:'wwe', type:'base', tags:[], link:'panini-era.html' },
      { year:2025, set:'Topps WWE',          num:'#5',  promo:'wwe', type:'base', tags:[], link:'current-topps.html' },
    ]
  },

  {
    name: 'Seth Rollins',
    eras: ['modern'],
    dotColor: '#3498db',
    keyNote: "The Visionary\'s card journey goes from Shield-era RC to Panini Prizm key. The 2013 Topps Shield-era RC with Ambrose and Reigns is the must-have early Rollins.",
    cards: [
      { year:2007, set:'ROH Trading Cards',  num:'—',   promo:'indie',type:'rc',  tags:['RC','Tyler Black','RARE'], note:'As Tyler Black in ROH. Pre-WWE, extremely rare.', link:'independent.html' },
      { year:2013, set:'Topps WWE',          num:'—',   promo:'wwe', type:'rc',   tags:['RC','Shield'], link:'first-topps.html' },
      { year:2015, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:['Champion'], link:'first-topps.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'#2',  promo:'wwe', type:'base', tags:[], link:'panini-era.html' },
      { year:2025, set:'Topps WWE',          num:'#4',  promo:'wwe', type:'base', tags:[], link:'current-topps.html' },
    ]
  },

  {
    name: 'Cody Rhodes',
    eras: ['modern','aew'],
    dotColor: '#e8c84a',
    keyNote: "The American Nightmare\'s 2022 Panini Prizm WWE RC is the defining card of the current collecting era. His AEW Upper Deck card from 2021 predates it — get both. The story is finished, and so is the RC window.",
    cards: [
      { year:2008, set:'Topps WWE',          num:'—',   promo:'wwe', type:'rc',   tags:['RC'], note:'First WWE Topps appearance as Legacy member', link:'first-topps.html' },
      { year:2021, set:'Upper Deck AEW S1',  num:'#8',  promo:'aew', type:'base', tags:['AEW Chapter'], link:'aew-cards.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'#17', promo:'wwe', type:'rc',   tags:['RC','KEY','MAJOR'], note:'The card of the era. WWE return RC. Buy it.', link:'panini-era.html' },
      { year:2023, set:'Panini Prizm WWE',   num:'#3',  promo:'wwe', type:'base', tags:['Champion'], link:'panini-era.html' },
      { year:2025, set:'Topps WWE',          num:'#1',  promo:'wwe', type:'base', tags:['Champion'], link:'current-topps.html' },
    ]
  },

  {
    name: 'Gunther',
    eras: ['modern'],
    dotColor: '#3498db',
    keyNote: "The Ring General\'s 2022 Panini Prizm WWE RC arrived right as he was beginning his historic Intercontinental Championship reign. His NXT run as WALTER had indie cards — making him one of the few with both an indie RC and a WWE Prizm RC.",
    cards: [
      { year:2019, set:'Indie/NXT Cards (WALTER)',num:'—',promo:'indie',type:'rc', tags:['RC','WALTER','Indie'], note:'As WALTER — pre-WWE indie cards are legitimately rare', link:'independent.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'#19', promo:'wwe', type:'rc',   tags:['RC','KEY'], note:'WWE Prizm RC. IC title reign about to begin.', link:'panini-era.html' },
      { year:2023, set:'Panini Prizm WWE',   num:'#5',  promo:'wwe', type:'base', tags:['Champion'], link:'panini-era.html' },
      { year:2025, set:'Topps WWE',          num:'#2',  promo:'wwe', type:'base', tags:['Champion'], link:'current-topps.html' },
    ]
  },

  {
    name: 'Sasha Banks / Mercedes Moné',
    eras: ['modern','aew'],
    dotColor: '#9b59b6',
    keyNote: "The Boss\'s 2015 Topps WWE NXT insert is one of the most important modern RCs in the hobby — a watershed card that defines the Women\'s Revolution. Her AEW and NJPW career means new cards are coming from other promotions.",
    cards: [
      { year:2015, set:'Topps WWE (NXT Insert)',num:'NXT-SB',promo:'wwe',type:'rc',tags:['RC','KEY','Women\'s Revolution'], note: "THE card of the Women\'s Revolution era. Buy it now.", link:'first-topps.html' },
      { year:2016, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2019, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2021, set:'Topps Chrome WWE',   num:'#25', promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
    ]
  },

  {
    name: 'Becky Lynch',
    eras: ['modern'],
    dotColor: '#e67e22',
    keyNote: "The Man\'s 2015 NXT insert is a key card that defined her career before the main roster. Her WrestleMania 35 moment cemented this card\'s importance forever.",
    cards: [
      { year:2015, set:'Topps WWE (NXT Insert)',num:'NXT-BL',promo:'wwe',type:'rc',tags:['RC','KEY','The Man'], note:'NXT insert RC. WrestleMania 35 made this a key card.', link:'first-topps.html' },
      { year:2016, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'#24', promo:'wwe', type:'base', tags:[], link:'panini-era.html' },
      { year:2025, set:'Topps WWE',          num:'#25', promo:'wwe', type:'base', tags:[], link:'current-topps.html' },
    ]
  },

  {
    name: 'Charlotte Flair',
    eras: ['modern'],
    dotColor: '#3498db',
    keyNote: "The Queen\'s 2015 Topps WWE NXT insert is her RC. Ric Flair\'s daughter becoming a 14-time champion makes the bloodline argument for this card\'s long-term value.",
    cards: [
      { year:2015, set:'Topps WWE (NXT Insert)',num:'NXT-CF',promo:'wwe',type:'rc',tags:['RC','KEY'], note: "NXT insert RC. Ric Flair\'s daughter, 14-time champion.", link:'first-topps.html' },
      { year:2016, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'#23', promo:'wwe', type:'base', tags:[], link:'panini-era.html' },
    ]
  },

  {
    name: 'Bayley',
    eras: ['modern'],
    dotColor: '#e8c84a',
    keyNote: "The Role Model\'s 2015 NXT insert is her RC and it captures an iconic NXT TakeOver Brooklyn moment. As a long-tenured main event star her early cards are still reasonably priced.",
    cards: [
      { year:2015, set:'Topps WWE (NXT Insert)',num:'NXT-BY',promo:'wwe',type:'rc',tags:['RC','KEY'], link:'first-topps.html' },
      { year:2019, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'#27', promo:'wwe', type:'base', tags:[], link:'panini-era.html' },
    ]
  },

  {
    name: 'Rhea Ripley',
    eras: ['modern'],
    dotColor: '#cc1f1f',
    keyNote: "Mami\'s card trajectory is one of the fastest in modern collecting. Her early Topps NXT cards are already undervalued given where her career went. The 2022 Prizm key card is the defining Rhea piece.",
    cards: [
      { year:2019, set:'Topps WWE NXT',      num:'—',   promo:'wwe', type:'rc',   tags:['RC'], note:'NXT-era RC. Pre-main-roster, already rising in value.', link:'first-topps.html' },
      { year:2021, set:'Topps Chrome WWE',   num:'#8',  promo:'wwe', type:'base', tags:['KEY'], link:'first-topps.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'#21', promo:'wwe', type:'base', tags:['KEY'], link:'panini-era.html' },
      { year:2023, set:'Panini Prizm WWE',   num:'#18', promo:'wwe', type:'base', tags:['Champion'], link:'panini-era.html' },
      { year:2025, set:'Topps WWE',          num:'#21', promo:'wwe', type:'base', tags:[], link:'current-topps.html' },
    ]
  },

  {
    name: 'Bianca Belair',
    eras: ['modern'],
    dotColor: '#2ecc71',
    keyNote: "The EST\'s 2021 Topps Chrome WWE RC is a defining card of the modern era — a landmark moment in representation combined with a genuinely great performer at her peak. The Chrome RC is the one to own.",
    cards: [
      { year:2019, set:'Topps WWE NXT',      num:'—',   promo:'wwe', type:'rc',   tags:['RC'], note:'NXT RC before the main roster call-up.', link:'first-topps.html' },
      { year:2021, set:'Topps Chrome WWE',   num:'#4',  promo:'wwe', type:'rc',   tags:['RC','KEY','Chrome'], note:'The Chrome RC. WrestleMania moment cemented this card.', link:'first-topps.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'#22', promo:'wwe', type:'base', tags:['Champion'], link:'panini-era.html' },
      { year:2025, set:'Topps WWE',          num:'#22', promo:'wwe', type:'base', tags:[], link:'current-topps.html' },
    ]
  },

  {
    name: 'MJF',
    eras: ['aew'],
    dotColor: '#9b59b6',
    keyNote: "The Salt of the Earth\'s AEW RC from Upper Deck 2021 is one of the most important AEW cards in existence. A generational heel with undeniable mic and ring skills — this is the AEW card collectors will chase in 10 years.",
    cards: [
      { year:2021, set:'Upper Deck AEW S1',  num:'#5',  promo:'aew', type:'rc',   tags:['RC','KEY'], note:'The AEW RC of MJF. Generational heel talent.', link:'aew-cards.html' },
      { year:2022, set:'Upper Deck AEW',     num:'#3',  promo:'aew', type:'base', tags:['Champion'], link:'aew-cards.html' },
      { year:2022, set:'Leaf AEW Autographs',num:'A-MJF',promo:'aew',type:'auto', tags:['On-Card Auto'], link:'aew-cards.html' },
    ]
  },

  {
    name: 'Kenny Omega',
    eras: ['aew','indie'],
    dotColor: '#9b59b6',
    keyNote: "The Best Bout Machine\'s AEW RC came after one of the most celebrated runs in Japanese wrestling history. His NJPW cards are very rare in America; the Upper Deck AEW RC is the accessible key card.",
    cards: [
      { year:2015, set:'NJPW Japanese Cards', num:'—',  promo:'indie',type:'rc',  tags:['RC','NJPW','Japan Only'], note:'NJPW era cards. Rare in American market.', link:'independent.html' },
      { year:2021, set:'Upper Deck AEW S1',  num:'#3',  promo:'aew', type:'rc',   tags:['RC','KEY'], note:'AEW RC. Best Bout Machine on American cardboard.', link:'aew-cards.html' },
      { year:2022, set:'Upper Deck AEW',     num:'#6',  promo:'aew', type:'base', tags:[], link:'aew-cards.html' },
    ]
  },

  {
    name: 'Jon Moxley',
    eras: ['modern','aew','indie'],
    dotColor: '#cc1f1f',
    keyNote: "Moxley\'s card history spans three promotions: WWE (as Dean Ambrose), AEW, and indie. The Dean Ambrose Shield-era RC from 2013 Topps is the most accessible key card. The AEW chapter is covered by Upper Deck.",
    cards: [
      { year:2013, set:'Topps WWE',          num:'—',   promo:'wwe', type:'rc',   tags:['RC','Dean Ambrose','Shield'], note:'Dean Ambrose Shield-era RC. Pre-Moxley rebrand.', link:'first-topps.html' },
      { year:2021, set:'Upper Deck AEW S1',  num:'#7',  promo:'aew', type:'rc',   tags:['RC','AEW Chapter'], link:'aew-cards.html' },
      { year:2022, set:'Upper Deck AEW',     num:'#4',  promo:'aew', type:'base', tags:['Champion'], link:'aew-cards.html' },
    ]
  },

  {
    name: 'Bryan Danielson',
    eras: ['modern','aew','indie'],
    dotColor: '#9b59b6',
    keyNote: "Daniel Bryan\'s card history is the most complex of any active wrestler — ROH indie cards (ultra-rare), WWE Topps cards as Daniel Bryan, and AEW Upper Deck cards as Bryan Danielson. Three distinct card identities for three distinct career chapters.",
    cards: [
      { year:2005, set:'ROH Trading Cards',  num:'—',   promo:'indie',type:'rc',  tags:['RC','INDIE RC','RARE'], note:'As Bryan Danielson in ROH. Extremely rare pre-WWE cards.', link:'independent.html' },
      { year:2012, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:['Daniel Bryan','YES Movement'], link:'first-topps.html' },
      { year:2014, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:['Champion','WM30'], link:'first-topps.html' },
      { year:2021, set:'Upper Deck AEW S1',  num:'#2',  promo:'aew', type:'rc',   tags:['RC','KEY','AEW Return'], note:'AEW RC as Bryan Danielson. Second career chapter.', link:'aew-cards.html' },
      { year:2022, set:'Upper Deck AEW',     num:'#2',  promo:'aew', type:'base', tags:[], link:'aew-cards.html' },
    ]
  },

  {
    name: 'Darby Allin',
    eras: ['aew'],
    dotColor: '#9b59b6',
    keyNote: "The daredevil\'s AEW RC from Upper Deck 2021 is among the more sought-after AEW cards outside the obvious Punk/Danielson headliners. Darby\'s risk-taking persona resonates with collectors who value authenticity.",
    cards: [
      { year:2021, set:'Upper Deck AEW S1',  num:'#13', promo:'aew', type:'rc',   tags:['RC'], link:'aew-cards.html' },
      { year:2022, set:'Upper Deck AEW',     num:'#18', promo:'aew', type:'base', tags:[], link:'aew-cards.html' },
    ]
  },

  {
    name: 'Jade Cargill',
    eras: ['aew','modern'],
    dotColor: '#2ecc71',
    keyNote: "Jade Cargill\'s AEW RC from Upper Deck 2021 is a key card that predates her WWE signing. The first generation of Jade Cargill cards — AEW era — will be the ones to have when the mainstream recognizes her ceiling.",
    cards: [
      { year:2021, set:'Upper Deck AEW S1',  num:'#10', promo:'aew', type:'rc',   tags:['RC','KEY'], note:'AEW RC. Pre-WWE signing. The key Jade Cargill card.', link:'aew-cards.html' },
      { year:2022, set:'Upper Deck AEW',     num:'#13', promo:'aew', type:'base', tags:['Champion'], link:'aew-cards.html' },
      { year:2025, set:'Topps WWE',          num:'#28', promo:'wwe', type:'rc',   tags:['RC','WWE Debut'], note:'First WWE Topps card. Buy the AEW RC instead.', link:'current-topps.html' },
    ]
  },

  {
    name: 'AJ Styles',
    eras: ['modern','indie'],
    dotColor: '#e67e22',
    keyNote: "The Phenomenal One has one of the most complex card histories in wrestling — TNA cards, NJPW Japanese cards, ROH cards, and then WWE Topps from 2016 onward. His 2006 Pacific TNA RC is a key card many collectors don\'t even know exists.",
    cards: [
      { year:2003, set:'ROH Trading Cards',  num:'—',   promo:'indie',type:'rc',  tags:['RC','ROH/TNA era','RARE'], link:'independent.html' },
      { year:2006, set:'Pacific TNA',        num:'—',   promo:'tna',  type:'rc',  tags:['RC','KEY','TNA RC'], note:'The Pacific TNA RC — one of the most underrated RCs in the hobby.' },
      { year:2016, set:'Topps WWE',          num:'—',   promo:'wwe', type:'rc',   tags:['RC','WWE Debut'], link:'first-topps.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'#10', promo:'wwe', type:'base', tags:[], link:'panini-era.html' },
    ]
  },

  {
    name: 'Rey Mysterio',
    eras: ['golden','modern','hof'],
    dotColor: '#3498db',
    keyNote: "The Master of the 619\'s first cards appear in WCW sets in the late 1990s — when he was a young cruiserweight sensation. These WCW-era cards are the key early Mysterio pieces, often overlooked in favor of his WWE run.",
    cards: [
      { year:1998, set:'Topps WCW/nWo',      num:'—',   promo:'wcw', type:'rc',   tags:['RC','WCW era','KEY'], note:'First major Mysterio card. WCW cruiserweight days.', link:'golden-age.html' },
      { year:1999, set:'Topps WCW Nitro',    num:'—',   promo:'wcw', type:'base', tags:[], link:'golden-age.html' },
      { year:2005, set:'Topps WWE Heritage', num:'—',   promo:'wwe', type:'base', tags:['Champion'], link:'first-topps.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'#11', promo:'wwe', type:'base', tags:[], link:'panini-era.html' },
    ]
  },

  {
    name: 'Edge',
    eras: ['attitude','modern','hof'],
    dotColor: '#e8c84a',
    keyNote: "The Rated R Superstar\'s first card appears in the 2000 Fleer WWF WrestleMania set during his breakout year — alongside Kurt Angle, the Hardy Boyz, and Lita. A career-spanning card history from Attitude Era RC through retirement and return.",
    cards: [
      { year:2000, set:'Fleer WWF WrestleMania',num:'—',promo:'wwf', type:'rc',   tags:['RC','KEY','Attitude RC'], note:'Attitude Era RC alongside an iconic rookie class.', link:'golden-age.html' },
      { year:2001, set:'Fleer WWF WrestleMania',num:'—',promo:'wwf', type:'base', tags:['Champion'], link:'fleer-era.html' },
      { year:2005, set:'Topps WWE Heritage', num:'—',   promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2012, set:'Topps WWE',          num:'#9',  promo:'wwe', type:'base', tags:[], link:'first-topps.html' },
      { year:2021, set:'Topps Chrome WWE',   num:'#9',  promo:'wwe', type:'base', tags:['Return'], link:'first-topps.html' },
    ]
  },

  {
    name: 'Finn Bálor',
    eras: ['modern'],
    dotColor: '#3498db',
    keyNote: "The Prince\'s 2015 Topps WWE NXT insert is his key RC — produced when he was still the Demon King of NXT. His cards have maintained steady value through his entire WWE run.",
    cards: [
      { year:2015, set:'Topps WWE (NXT Insert)',num:'NXT-FB',promo:'wwe',type:'rc',tags:['RC','KEY','Demon'], note:'NXT insert RC. The Demon era.', link:'first-topps.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'#8',  promo:'wwe', type:'base', tags:[], link:'panini-era.html' },
    ]
  },

  {
    name: 'Kevin Owens',
    eras: ['modern','indie'],
    dotColor: '#cc1f1f',
    keyNote: "KO has a rare multi-era card history: ROH indie cards as Kevin Steen (very rare), and a full WWE Topps run. His 2015 NXT insert is the WWE key card. His Steen-era ROH cards are genuine rarities that few collectors have seen.",
    cards: [
      { year:2008, set:'ROH (Kevin Steen)',  num:'—',   promo:'indie',type:'rc',  tags:['RC','Kevin Steen','RARE'], note:'As Kevin Steen in ROH. Pre-WWE, legitimately scarce.', link:'independent.html' },
      { year:2015, set:'Topps WWE (NXT Insert)',num:'NXT-KO',promo:'wwe',type:'rc',tags:['RC','KEY'], note:'NXT debut RC. Instantly became a key card.', link:'first-topps.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'#5',  promo:'wwe', type:'base', tags:[], link:'panini-era.html' },
      { year:2025, set:'Topps WWE',          num:'#7',  promo:'wwe', type:'base', tags:[], link:'current-topps.html' },
    ]
  },

  {
    name: 'Sami Zayn',
    eras: ['modern','indie'],
    dotColor: '#e67e22',
    keyNote: "Sami\'s El Generico ROH cards are among the most sought-after indie wrestling cards — a masked hero who became one of WWE\'s most beloved performers. The Honorary Uce story arc generated real card demand.",
    cards: [
      { year:2009, set:'ROH (El Generico)',  num:'—',   promo:'indie',type:'rc',  tags:['RC','El Generico','RARE'], note:'As El Generico in ROH. Mask-era cards are rare and important.', link:'independent.html' },
      { year:2015, set:'Topps WWE (NXT Insert)',num:'—', promo:'wwe', type:'rc',  tags:['RC'], link:'first-topps.html' },
      { year:2022, set:'Panini Prizm WWE',   num:'#6',  promo:'wwe', type:'base', tags:['Honorary Uce'], link:'panini-era.html' },
      { year:2025, set:'Topps WWE',          num:'#6',  promo:'wwe', type:'base', tags:[], link:'current-topps.html' },
    ]
  },

  {
    name: 'La Knight',
    eras: ['modern'],
    dotColor: '#e8c84a',
    keyNote: "YEAH! The megastar\'s 2023 Panini Prizm WWE RC is one of the highest-demand modern RCs — a fan favorite who organically became a main event star. His card trajectory is one to watch closely.",
    cards: [
      { year:2023, set:'Panini Prizm WWE',   num:'#9',  promo:'wwe', type:'rc',   tags:['RC','KEY','MEGASTAR'], note:'The breakout RC. Organic megastar.', link:'panini-era.html' },
      { year:2025, set:'Topps WWE',          num:'#10', promo:'wwe', type:'base', tags:[], link:'current-topps.html' },
    ]
  },

  {
    name: 'Samoa Joe',
    eras: ['modern','aew','indie'],
    dotColor: '#cc1f1f',
    keyNote: "Joe\'s ROH cards are among the most important indie wrestling cards ever made. His TNA cards, NXT, and AEW appearances add layers to one of the hobby\'s most complete card histories. Never as expensive as he should be.",
    cards: [
      { year:2004, set:'ROH Trading Cards',  num:'—',   promo:'indie',type:'rc',  tags:['RC','INDIE RC','RARE'], note:'ROH champion era. Historically significant indie card.', link:'independent.html' },
      { year:2006, set:'Pacific TNA',        num:'—',   promo:'tna',  type:'base', tags:['TNA Champion'] },
      { year:2018, set:'Topps WWE',          num:'—',   promo:'wwe', type:'rc',   tags:['RC','NXT/Main Roster'], link:'first-topps.html' },
      { year:2021, set:'Upper Deck AEW S2',  num:'—',   promo:'aew', type:'rc',   tags:['RC','AEW'], link:'aew-cards.html' },
    ]
  },


  {
    name: 'Andre the Giant',
    eras: ['vintage','golden','hof'],
    dotColor: '#e8c84a',
    keyNote: "The Eighth Wonder of the World's true rookie card is the 1974 Yamakatsu set from Japan — extremely rare. His first major American card is the 1982 Wrestling All-Stars Series A #1, a KEY card. The 1985 Topps #4 is his most iconic and accessible appearance.",
    cards: [
      { year:1982, set:'Wrestling All-Stars Series A', num:'#1',  promo:'wwf', type:'base', tags:['KEY','All-Stars'], note:'KEY card — but true RC is the 1974 Yamakatsu set. Still the first major American Andre card.', link:'early-wwf.html' },
      { year:1985, set:'Topps WWF',          num:'#2',  promo:'wwf', type:'base', tags:['KEY','Iconic'], note:'The iconic 1985 Topps appearance — a KEY card, not his RC.', link:'early-wwf.html' },
      { year:1986, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
      { year:1987, set:'Topps WWF Superstars',num:'—',  promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
    ]
  },

  {
    name: 'Roddy Piper',
    eras: ['vintage','golden','hof'],
    dotColor: '#cc1f1f',
    keyNote: "Hot Rod's true rookie card is 1985 Topps WWF #3 — he was not included in the 1982 Wrestling All-Stars sets. As one of the most charismatic performers in wrestling history, his 1985 Topps RC is a legitimate key card from the hobby's most important vintage set.",
    cards: [
      { year:1985, set:'Topps WWF',                    num:'#3',  promo:'wwf', type:'rc',   tags:['RC','KEY'], note:'True rookie card — Piper was not in the 1982 Wrestling All-Stars sets.', link:'early-wwf.html' },
      { year:1985, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:['KEY'], note:'1985 Topps appearance — a KEY card, not his RC.', link:'early-wwf.html' },
      { year:1986, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
    ]
  },

  {
    name: 'Ric Flair',
    eras: ['vintage','golden','hof'],
    dotColor: '#3498db',
    keyNote: "The Nature Boy's true rookie card is the 1982 Wrestling All-Stars #13 — produced during his NWA World Heavyweight Championship reign. One of the hobby's great sleeper keys: a legitimate HOF RC that predates all WWE sets.",
    cards: [
      { year:1982, set:'Wrestling All-Stars Series A', num:'#27', promo:'wwf', type:'rc',   tags:['RC','KEY','All-Stars','True RC','NWA'], note:'True rookie card. First Ric Flair card ever produced. NWA Champion at time of issue.', link:'early-wwf.html' },
      { year:1985, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
      { year:1990, set:'Classic WWF Series I',num:'—',  promo:'wwf', type:'base', tags:[], link:'golden-age.html' },
      { year:1995, set:'Cardz WCW Main Event',num:'—',  promo:'wcw', type:'base', tags:['WCW Champion'], link:'golden-age.html' },
      { year:2012, set:'Topps WWE',          num:'—',   promo:'wwe', type:'base', tags:['Legend'], link:'first-topps.html' },
    ]
  },

  {
    name: 'Bob Backlund',
    eras: ['vintage','golden','hof'],
    dotColor: '#e8c84a',
    keyNote: "The all-American champion's true rookie card is the 1982 Wrestling All-Stars #3 — produced during his historic WWF Championship reign. As the man who held the title before and after Hulk Hogan, Backlund is one of the most underappreciated names in the hobby.",
    cards: [
      { year:1982, set:'Wrestling All-Stars Series A', num:'#12', promo:'wwf', type:'rc',   tags:['RC','KEY','All-Stars','True RC','WWF Champion'], note:'True rookie card. WWF Champion at time of issue.', link:'early-wwf.html' },
      { year:1985, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
      { year:1994, set:'Action Packed WWF',  num:'—',   promo:'wwf', type:'base', tags:['Return','Second Reign'], link:'golden-age.html' },
    ]
  },

  {
    name: 'Jimmy Snuka',
    eras: ['vintage','golden','hof'],
    dotColor: '#e67e22',
    keyNote: "Superfly Jimmy Snuka's true rookie card is the 1982 Wrestling All-Stars #4. His leap from the top of the steel cage at Madison Square Garden is one of the defining moments in wrestling history.",
    cards: [
      { year:1983, set:'Wrestling All-Stars',          num:'#7',  promo:'wwf', type:'rc',   tags:['RC','All-Stars','True RC'], note:'True rookie card. First Snuka card ever produced.', link:'early-wwf.html' },
      { year:1985, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
      { year:1987, set:'Topps WWF Superstars',num:'—',  promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
    ]
  },

  {
    name: 'Ricky Steamboat',
    eras: ['vintage','golden','hof'],
    dotColor: '#3498db',
    keyNote: "The Dragon's true rookie card is the 1982 Wrestling All-Stars #21 — produced years before his legendary WrestleMania III match with Randy Savage. His 1985 Topps card was long considered his RC but the All-Stars card predates it by three years.",
    cards: [
      { year:1982, set:'Wrestling All-Stars Series B', num:'#11', promo:'wwf', type:'rc',   tags:['RC','KEY','All-Stars','True RC'], note:'True rookie card. First Ricky Steamboat card ever produced.', link:'early-wwf.html' },
      { year:1985, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:['KEY'], note:'1985 Topps appearance. Previously misidentified as his RC.', link:'early-wwf.html' },
      { year:1986, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
    ]
  },

  {
    name: 'Jesse Ventura',
    eras: ['vintage','golden','hof'],
    dotColor: '#9b59b6',
    keyNote: "The Body's true rookie card is the 1982 Wrestling All-Stars #29. Before he was a broadcaster or governor of Minnesota, Jesse Ventura was one of the most physical heels in the WWF — and his All-Stars RC is a legitimate vintage key.",
    cards: [
      { year:1982, set:'Wrestling All-Stars Series B', num:'#20', promo:'wwf', type:'rc',   tags:['RC','All-Stars','True RC'], note:'True rookie card. First Jesse Ventura card ever produced.', link:'early-wwf.html' },
      { year:1985, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:['KEY'], note:'1985 Topps appearance. Previously misidentified as his RC.', link:'early-wwf.html' },
      { year:1986, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
    ]
  },

  {
    name: 'Bobby Heenan',
    eras: ['vintage','golden','hof'],
    dotColor: '#cc1f1f',
    keyNote: "The Brain's true rookie card is the 1982 Wrestling All-Stars #35. The greatest manager in wrestling history, Bobby Heenan was already a legendary figure at the time of this card's issue. His All-Stars RC is one of the most undervalued manager cards in the hobby.",
    cards: [
      { year:1982, set:'Wrestling All-Stars Series B', num:'#16', promo:'wwf', type:'rc',   tags:['RC','All-Stars','True RC','Manager'], note:'True rookie card. Greatest manager in wrestling history on cardboard.', link:'early-wwf.html' },
      { year:1985, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:['KEY'], note:'1985 Topps appearance. Previously misidentified as his RC.', link:'early-wwf.html' },
      { year:1986, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
    ]
  },

  {
    name: 'Dusty Rhodes',
    eras: ['vintage','golden','hof'],
    dotColor: '#e8c84a',
    keyNote: "The American Dream's true rookie card is the 1982 Wrestling All-Stars #14. Son of a plumber, voice of the people — Dusty Rhodes was one of the greatest promo men in wrestling history and his All-Stars RC is a legitimate sleeper key.",
    cards: [
      { year:1982, set:'Wrestling All-Stars Series A', num:'#6',  promo:'wwf', type:'rc',   tags:['RC','All-Stars','True RC','NWA'], note:'True rookie card. First Dusty Rhodes card ever produced.', link:'early-wwf.html' },
      { year:1985, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
      { year:1990, set:'Classic WWF Series I',num:'—',  promo:'wwf', type:'base', tags:[], link:'golden-age.html' },
    ]
  },

  {
    name: 'Iron Sheik',
    eras: ['vintage','golden','hof'],
    dotColor: '#cc1f1f',
    keyNote: "The Iron Sheik's true rookie card is the 1983 Wrestling All-Stars Series B #4 — produced the same year he defeated Bob Backlund for the WWF Championship before losing it to Hulk Hogan. A genuinely historic card from one of wrestling's most memorable title changes.",
    cards: [
      { year:1982, set:'Wrestling All-Stars Series B', num:'#25', promo:'wwf', type:'rc',   tags:['RC','KEY','All-Stars','True RC','WWF Champion'], note:'True rookie card. WWF title reign came the following year — Backlund-Sheik-Hogan transition.', link:'early-wwf.html' },
      { year:1985, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
      { year:1987, set:'Topps WWF Superstars',num:'—',  promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
    ]
  },

  {
    name: 'Terry Funk',
    eras: ['vintage','golden','hof'],
    dotColor: '#e67e22',
    keyNote: "The Funker's true rookie card is the 1982 Wrestling All-Stars #25. A legend spanning five decades of professional wrestling, Terry Funk's All-Stars RC predates all NWA and WWF set appearances. A true vintage key for any serious collector.",
    cards: [
      { year:1982, set:'Wrestling All-Stars Series A', num:'#10', promo:'wwf', type:'rc',   tags:['RC','All-Stars','True RC','NWA'], note:'True rookie card. First Terry Funk card ever produced.', link:'early-wwf.html' },
      { year:1985, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
      { year:1999, set:'Topps WCW/nWo Nitro',num:'—',  promo:'wcw', type:'base', tags:['Legend'], link:'golden-age.html' },
    ]
  },

  {
    name: 'Jerry Lawler',
    eras: ['vintage','golden','hof'],
    dotColor: '#cc1f1f',
    keyNote: "The King's true rookie card is the 1982 Wrestling All-Stars #31. The Memphis wrestling legend was already an institution at the time of this card — and his All-Stars RC is a legitimate vintage key that most collectors overlook.",
    cards: [
      { year:1982, set:'Wrestling All-Stars Series A', num:'#34', promo:'wwf', type:'rc',   tags:['RC','All-Stars','True RC'], note:'True rookie card. Memphis legend on cardboard.', link:'early-wwf.html' },
      { year:1985, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
    ]
  },

  {
    name: 'Rocky Johnson',
    eras: ['vintage','hof'],
    dotColor: '#e8c84a',
    keyNote: "Rocky Johnson's true rookie card is the 1982 Wrestling All-Stars #32 — a card that carries enormous historical weight as the card of The Rock's father. A Hall of Famer and tag team champion, Johnson's All-Stars RC is one of the hobby's most historically significant bloodline cards.",
    cards: [
      { year:1983, set:'Wrestling All-Stars',          num:'#24', promo:'wwf', type:'rc',   tags:['RC','All-Stars','True RC','The Rock Father'], note: "True rookie card. The Rock's father — one of wrestling's most important bloodline cards.", link:'early-wwf.html' },
      { year:1985, set:'Topps WWF',          num:'—',   promo:'wwf', type:'base', tags:[], link:'early-wwf.html' },
    ]
  },

];
