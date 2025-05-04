import React, { useState } from 'react';

// Expanded Tamil arts data with additional information
const aayarKalaiList = [
  {
  name: '1. எழுத்திலக்கணம் (அக்கரவிலக்கணம்) / Letter Grammar (Akara Vilakkam)',
  description: 'தமிழ் எழுத்துகளின் ஒழுங்கும் வகைகளும் குறிக்கும் இலக்கணக் கல்வி.',
  history: 'பண்டைய காலத்தில் தமிழின் எழுத்து அமைப்பை விளக்கும் முதன்மை கல்விகளில் ஒன்று.',
  use: 'மொழி உருவாக்கம் மற்றும் இலக்கணப் பயிற்சிக்குப் பயன்படுகிறது.',
  specialFeatures: 'அகர வரிசை, உயிர்மெய் அமைப்புகள், எழுத்து ஒழுங்குகள்.',
  image: 'images/arts/1.png',
  },
  {
  name: '2. எழுத்தாற்றல் (லிகிதம்) / Calligraphy & Writing Skill (Likhitam)',
  description: 'எழுத்துக்களை அழகாகவும் துல்லியமாகவும் எழுதும் கலை.',
  history: 'பண்டைய கல்விக் காலங்களில் கல்விக்குப் பின்பற்றப்பட்ட அடிப்படை கலை.',
  use: 'ஆவணங்கள், கையெழுத்துப் புத்தகங்கள், கல்விச்சான்றுகள் எழுத பயன்படுகிறது.',
  specialFeatures: 'கையெழுத்து வடிவங்கள், எழுத்துத் தொணிகள்.',
  image: 'images/arts/2.png',
  },
  {
  name: '3. கணிதம் / Mathematics',
  description: 'எண் கணிப்பு, அளவீடுகள், தொகை, பகுப்பு போன்ற கணிதத் திறன்கள்.',
  history: 'தமிழ் அறிவியல் வரலாற்றில் முக்கிய பங்கு வகித்தது.',
  use: 'கல்வி, வர்த்தகம், கட்டிடக்கலை போன்ற துறைகளில் பயன்படுகிறது.',
  specialFeatures: 'பழைய எண் முறைகள், கணக்குப்பிழை இல்லாத திறன்கள்.',
  image: 'images/arts/3.png',
  },
  {
  name: '4. மறைநூல் (வேதம்) / Study of Vedas (Marainool)',
  description: 'வேதங்களின் மூலம் ஆன்மிக அறிவும் பயிற்சியும்.',
  history: 'இந்துக்களின் பண்டை தர்ம வழிகாட்டியிலும் பாகவத வழிபாடிலும் முக்கியம்.',
  use: 'யாகங்கள், வேத பாராயணம், ஆன்மீக வழிகாட்டுதல்.',
  specialFeatures: 'மந்திர உச்சாரணம், வேத பாசுர பாவனை.',
  image: 'images/arts/4.png',
  },
  {
  name: '5. தொன்மம் (புராணம்) / Ancient Epics & Puranas',
  description: 'புராணங்களின் மூலம் தெய்வ வழிபாடும் மனித வாழ்வின் வரலாறும்.',
  history: 'பண்டைய இந்தியக் கலை இலக்கியத்தில் புகழ்பெற்றது.',
  use: 'ஆன்மீகக் கல்வி, கதையாசிரியர்களுக்குப் பயன்படுகிறது.',
  specialFeatures: 'தெய்வ வரலாறுகள், உன்னதமான கற்பனைக் கூறுகள்.',
  image: 'images/arts/5.png',
  },
  {
  name: '6. இலக்கணம் (வியாகரணம்) / Grammar (Vyakarana)',
  description: 'மொழியின் அமைப்பு மற்றும் ஒழுங்கை பற்றிய அறிவியல் படிப்பு.',
  history: 'தமிழிலும் சம்ஸ்கிருதத்திலும் இலக்கண நூல்கள் மிகுந்த முக்கியத்துவம் பெற்றவை.',
  use: 'மொழிபயிற்சி, உரை எழுதும் திறன்கள் மேம்படுகின்றன.',
  specialFeatures: 'சொற்களின் வகை, உருபிகள், வாக்கிய அமைப்புகள்.',
  image: 'images/arts/6.png',
  },
  {
  name: '7. நயனூல் (நீதி சாத்திரம்) / Ethics and Morality (Naya Nool)',
  description: 'நல்லொழுக்கம், நீதிமொழிகள் மற்றும் ஒழுக்கநெறி பற்றிய கல்வி.',
  history: 'திருக்குறள் போன்று பல நூல்களில் நெறி வழிகாட்டுதல்கள் வழங்கப்பட்டுள்ளன.',
  use: 'தகவல் மேலாண்மை, சமூக ஒழுங்கு நிலை.',
  specialFeatures: 'அறவுரை, சமூக நீதிச் சட்டங்கள்.',
  image: 'images/arts/7.png',
  },
  {
  name: '8. கணியம் (சோதிட சாத்திரம்) / Astrology (Kaniyam)',
  description: 'ஜோதிடக் கணிப்புகளும் கிரகங்களின் இயக்கமும் பற்றிய அறிவியல்.',
  history: 'வீட்டுப் பிறப்புகள், திருமண யோகம், எதிர்காலத் திட்டங்கள் ஆகியவற்றில் பயன்படுத்தப்பட்டது.',
  use: 'கால கணிப்பு, ஜாதகம் எழுதுதல்.',
  specialFeatures: 'நட்சத்திரம், கிரகப் பெயர்ச்சி, யோகங்கள்.',
  image: 'images/arts/8.png',
  },
  {
  name: '9. அறநூல் (தரும சாத்திரம்) / Dharma Scriptures',
  description: 'அறத்தின் சாரமும் மனித வாழ்வின் தர்ம வழிகள் பற்றிய நூல்கள்.',
  history: 'மனித வாழ்வில் ஒழுக்கம் மற்றும் தர்ம வழியை வழிகாட்டும் நூல்கள்.',
  use: 'சமூக ஒழுங்கு, ஆன்மீக வளர்ச்சி.',
  specialFeatures: 'அற நீதிமொழிகள், தர்மக் கட்டுப்பாடுகள்.',
  image: 'images/arts/9.png',
  },
  {
  name: '10. ஓகநூல் (யோக சாத்திரம்) / Yoga Shastra',
  description: 'மனதையும் உடலையும் கட்டுப்படுத்தும் யோகக் கல்வி.',
  history: 'பண்டைய காலத்தில் முனிவர்களால் பயிற்றப்பட்ட ஆன்மிகக் கல்வி.',
  use: 'மனநலம், உடற் ஆரோக்கியம், ஆன்மீக வளர்ச்சி.',
  specialFeatures: 'அசனங்கள், பிராணாயாமம், சமாதி நிலைகள்.',
  image: 'images/arts/10.png',
  },
  {
    name: '11. மந்திர நூல் (மந்திர சாத்திரம்) / Mantra Scriptures',
    description: 'மந்திரங்களின் பலனை அறிந்து பயன்பாடுகளை விளக்கும் சாத்திரம்.',
    history: 'வேத யுகத்திலிருந்து பயன்படுத்தப்பட்டு வரும் ஆன்மீக வழி.',
    use: 'ஆராதனை, நோய்கள் தீர, சாந்தி செய்வதில்.',
    specialFeatures: 'உச்சரிப்பு முறை, பரிகார மந்திரங்கள்.',
    image: 'images/arts/11.png',
    },
    {
    name: '12. நிமித்திக நூல் (சகுன சாத்திரம்) / Omens and Nimithas',
    description: 'நிகழும் நிகழ்வுகளை கொண்டு எதிர்காலத்தைக் கணிக்கும் கலை.',
    history: 'பண்டைய காலத்தில் அரசர்களும் முனிவர்களும் பயன்படுத்தினர்.',
    use: 'போகப்படும் வேலை நன்றாக நடக்கும் என தெரிந்து செயல் புரிதல்.',
    specialFeatures: 'காகம், பூனைகள், கனவு விளக்கம், பறவைகள் இயக்கம்.',
    image: 'images/arts/12.png',
    },
    {
    name: '13. கம்மிய நூல் (சிற்ப சாத்திரம்) / Sculpture & Architecture (Shilpa Shastra)',
    description: 'சிற்பங்கள், கோவில்கள் மற்றும் கட்டிடக் கலையை விளக்கும் நூல்.',
    history: 'தமிழகக் கோவில் கட்டட வடிவமைப்புகளுக்கு ஆதாரமானது.',
    use: 'கோவில், சிலை, வீடு கட்டிடத் துறையில்.',
    specialFeatures: 'அளவுகள், ஓவிய ஒழுங்குகள், பிம்ப வடிவங்கள்.',
    image: 'images/arts/13.png',
    },
    {
    name: '14. மருத்துவ நூல் (வைத்திய சாத்திரம்) / Medicine (Vaidhya Shastra)',
    description: 'நோய்களை ஆராய்ந்து சிகிச்சை செய்யும் தமிழ் மருத்துவக் கலை.',
    history: 'சித்தர்கள் மூலம் பரந்த தமிழ் மரபுக் மருத்துவம்.',
    use: 'மருந்து தயாரித்தல், நோய் நிவாரணம்.',
    specialFeatures: 'மூலிகை வழி சிகிச்சை, உடல் ரீதியான சமநிலை.',
    image: 'images/arts/14.png',
    },
    {
    name: '15. உறுப்பமைவு நூல் (உருவ சாத்திரம்) / Anatomy (Uruva Shastra)',
    description: 'மனித உடலின் அமைப்பையும் அதன் செயல்களையும் விளக்கும் நூல்.',
    history: 'பண்டைய சித்த மருத்துவத்தின் அடிப்படை அறிவாக இருந்தது.',
    use: 'மருத்துவம், வைத்தியம் மற்றும் நரம்பியல்.',
    specialFeatures: 'உடல் உறுப்புகள், மூளைக் கட்டமைப்பு.',
    image: 'images/arts/15.png',
    },
    {
    name: '16. மறவனப்பு (இதிகாசம்) / Epics & Itihasa',
    description: 'இராமாயணம் மற்றும் மகாபாரதம் போன்ற இதிகாசக் கதைகள்.',
    history: 'பண்பாட்டுக் கதைகளின் மூலமாக மக்களுக்கான வழிகாட்டுதல்கள்.',
    use: 'நீதிக்கல்வி, அறநெறி அறிவுரை.',
    specialFeatures: 'தர்மத்தின் போராட்டம், வீர கதைகள்.',
    image: 'images/arts/16.png',
    },
    {
    name: '17. வனப்பு / Aesthetics & Beauty',
    description: 'அழகு உணர்வும், பார்வை மற்றும் உடைபட்ட அணிவகுப்பும்.',
    history: 'பண்டைய அழகியல் சிந்தனைகளில் ஆதாரம் கொண்டது.',
    use: 'அலங்காரம், அழகு அளவீடுகள்.',
    specialFeatures: 'நிறம், வடிவம், ஒழுங்கு.',
    image: 'images/arts/17.png',
    },
    {
    name: '18. அணிநூல் (அலங்காரம்) / Alankaram (Ornamentation)',
    description: 'பாடல்களில் பயன்படுத்தப்படும் அலங்கார முறை.',
    history: 'சங்க கால இலக்கியங்களில் சிறந்த பங்கு வகித்தது.',
    use: 'இலக்கிய எழுத்து, கவிதை வரிகளின் சிறப்பாக்கம்.',
    specialFeatures: 'உவமைகள், உச்சிப்புகள், நயமான மொழிபெயர்ப்பு.',
    image: 'images/arts/18.png',
    },
    {
    name: '19. மதுரமொழிவு (மதுரபாடணம்) / Sweet Speech & Elocution',
    description: 'நயமான மொழியால் மக்களை ஈர்ப்பது.',
    history: 'நூலாசிரியர்கள், விற்பனைக்காரர்கள், அரசவைகளில் பேச பயன்பட்டது.',
    use: 'பொதுப்பேச்சு, தூதர்பணி, ஊடக உரை.',
    specialFeatures: 'பண்பட்ட சொற்கள், மென்மை, ஒழுங்கான ஓசைகள்.',
    image: 'images/arts/19.png',
    },
    {
    name: '20. நாடகம் / Drama & Theatre',
    description: 'விளக்கம் மற்றும் கதையகத்தை மேடையில் காண்பிக்கும் கலை.',
    history: 'பண்டைய தமிழ் நாடக மன்றங்களில் பரவி இருந்தது.',
    use: 'பாடசாலைகளில், சமுதாய விழாக்களில், அரசவைகளில்.',
    specialFeatures: 'வாசிப்பு, பாவனை, வசனங்கள், மேடை அலங்காரம்.',
    image: 'images/arts/20.png',
    },
    {
      name: '21. நடம் / Dance (Natyam)',
      description: 'இசை, அங்க பாவை, ஹஸ்த பாவனைகள் கொண்டு பக்தி, காதல், வீரத்தை வெளிப்படுத்தும் நடனக் கலை.',
      history: 'பாரத நாட்டியத்தின் மூலம் பரிணாமம் பெற்றுள்ளது.',
      use: 'கோவில் விழாக்களில், அரங்க நிகழ்ச்சிகளில்.',
      specialFeatures: 'பாவம், ஹஸ்தங்கள், அடிகள், நவரசங்கள்.',
      image: 'images/arts/21.png',
      },
      {
      name: '22. ஒலிநுட்ப அறிவு (சத்தப் பிரமம்) / Sound Engineering & Acoustics',
      description: 'ஒலியின் எழுச்சி, அதிர்வு, மற்றும் ஒலிபரப்பைக் குறித்த அறிவியல்.',
      history: 'வேத கால சங்கீதச் சாத்திரங்களின் பகுதியாக அறியப்பட்டது.',
      use: 'இசைநிகழ்ச்சிகள், கோவில் கட்டட அமைப்பு.',
      specialFeatures: 'ஒலி அதிர்வெண், சங்கீத ஓசை, ஒலிக்காற்று.',
      image: 'images/arts/22.png',
      },
      {
      name: '23. யாழ் (வீணை) / Yaal (Ancient String Instrument)',
      description: 'பழமையான தமிழிசை வாதியமாகிய யாழின் பயன்பாடு.',
      history: 'சங்க காலத்தில் மிகவும் புகழ்பெற்ற இசைக்கருவி.',
      use: 'பாடல்களுடன் இசைக்கருவியாக.',
      specialFeatures: 'நெளிதல், இயற்கை நூல்கள், மென்மையான ஒலி.',
      image: 'images/arts/23.png',
      },
      {
      name: '24. குழல் / Flute (Kuzhal)',
      description: 'மெல்லிய புழுதியான இசையுடன் கூடிய நாவினை உறைக்கும் குழல் வாசிப்பு.',
      history: 'மூல இசை வாத்தியங்களில் ஒன்றாகும்.',
      use: 'சமையோஜித இசை நிகழ்ச்சிகளில்.',
      specialFeatures: 'சுழற்சி மூச்சு, பல்வேறு சுரங்கள்.',
      image: 'images/arts/24.png',
      },
      {
      name: '25. மதங்கம் (மிருதங்கம்) / Mridangam',
      description: 'தாள இசைக்கருவிகளில் முதன்மையானதாக உள்ள மிருதங்க வாசிப்பு.',
      history: 'பாரத நாட்டியத்துடன் இணைந்து வளர்ந்தது.',
      use: 'நாடகம், சங்கீத அரங்கேற்றம்.',
      specialFeatures: 'தாள முறை, கை ரீதிகள், சிறந்த ஒலிக்கரம்.',
      image: 'images/arts/25.png',
      },
      {
      name: '26. தாளம் / Rhythm (Talam)',
      description: 'இசையின் துடிப்பான அஸ்திவாரம், கால அளவுகள், வகைகள்.',
      history: 'தாள சாத்திரம் எனும் பிரமாண நூல்களில் கூறப்பட்டது.',
      use: 'நாட்டியம், சங்கீதம், பாடல்.',
      specialFeatures: 'ஆதி, ரூபகம், கண்ட, மிஸ்ர, சங்கீர்ணம்.',
      image: 'images/arts/26.png',
      },
      {
      name: '27. விற்பயிற்சி (அத்திரவித்தை) / Archery & Weapon Training',
      description: 'வில், அம்பு உள்ளிட்ட ஆயுதங்களை பயன்படுத்தும் திறமை.',
      history: 'பண்டைய போர்க்களங்களில் முக்கியமான பயிற்சி.',
      use: 'பாதுகாப்பு, வேட்டை.',
      specialFeatures: 'கை இயக்கம், நோக்கு திறன், நேர்மை பயிற்சி.',
      image: 'images/arts/27.png',
      },
      {
      name: '28. பொன் நோட்டம் (கனக பரீட்சை) / Gold Testing',
      description: 'பொன்னின் தூய்மையை பரிசோதிக்கும் நுணுக்கமான கலை.',
      history: 'பண்டைய வர்த்தகர்களுக்கு அவசியமான அறிவு.',
      use: 'தங்க நகைகள் தயாரிப்பு மற்றும் விற்பனை.',
      specialFeatures: 'கலவையறிதல், நிறம், ஒளிர்வு, சோதனைத் தொழில் நுட்பம்.',
      image: 'images/arts/28.png',
      },
      {
      name: '29. தேர்ப்பயிற்சி (ரத பரீட்சை) / Chariot Riding',
      description: 'ரதத்தை ஓட்டும் மற்றும் அதன் இயக்கத் திறனைப் பயன்படுத்தும் பயிற்சி.',
      history: 'பண்டைய ராணுவங்களில் தேர் முக்கிய பங்கு வகித்தது.',
      use: 'போர், திருவிழா தேர் இயக்கம்.',
      specialFeatures: 'தேரின் அமைப்பு, பக்கவாட்டு இயக்கம், குதிரை கட்டுப்பாடு.',
      image: 'images/arts/29.png',
      },
      {
      name: '30. யானையேற்றம் (கச பரீட்சை) / Elephant Riding & Training',
      description: 'யானைகளை பழக்குவது மற்றும் ஏறி இயக்கும் திறன்.',
      history: 'அரசர்கள், சேனாபதிகள் பண்டைய யுத்தங்களில் பயன்படுத்தினர்.',
      use: 'போருக்கு, வனப் பயணம், பெருவிழாக்கள்.',
      specialFeatures: 'யானையின் மன நிலை அறிதல், கட்டுப்பாட்டு வழிகள்.',
      image: 'images/arts/30.png',
      },
      {
        name: '31. குதிரையேற்றம் (அசுவ பரீட்சை) / Horse Riding & Training',
        description: 'குதிரைகளை பழக்கி ஓட்டும் திறன் மற்றும் பயிற்சி.',
        history: 'பண்டைய காலங்களில் யுத்தங்களில் முக்கிய பங்கு வகித்தது.',
        use: 'போரின் போது, அசுவ சமரங்களில்.',
        specialFeatures: 'குதிரையின் நடத்த, குதிரை கட்டுப்பாடு, தண்டனைகள்.',
        image: 'images/arts/31.png',
      },
      {
        name: '32. மணிநோட்டம் (ரத்தின பரீட்சை) / Gem Testing',
        description: 'ரத்தினங்களின் அசல் மற்றும் குவாதையை பரிசோதிக்கும் கலை.',
        history: 'வாணிகரான மற்றும் சுத்தமான ரத்தினங்களை காண்பதற்கான அறிவு.',
        use: 'வணிகத்தில், நகைத் துறையில்.',
        specialFeatures: 'நிறம், வெளிச்சம், மேல் அடைவு, துலக்குதல்.',
        image: 'images/arts/32.png',
      },
      {
        name: '33. நிலத்து நூல்/மண்ணியல் (பூமி பரீட்சை) / Geology & Earth Sciences',
        description: 'பூமியின் அடிப்படை அமைப்புகள் மற்றும் இயற்கை மூலிகைகளை ஆராய்ச்சி செய்யும் கலை.',
        history: 'பண்டைய காலத்தில் மணல், கல், வெப்பவியல் ஆகியவற்றை பயிற்சி செய்தது.',
        use: 'மண் ஆய்வு, கட்டட அமைப்பு, அகழ்வாராய்ச்சி.',
        specialFeatures: 'மண் வகைகள், சிக்னல்கள், சோதனைகள்.',
        image: 'images/arts/33.png',
      },
      {
        name: '34. போர்ப்பயிற்சி (சங்கிராமவிலக்கணம்) / Warfare Training (Strategy)',
        description: 'போரின் தந்திரங்களை மற்றும் போர்க்கொள்கைகளை ஆய்வு செய்யும் கலை.',
        history: 'பண்டைய அரசர் மன்றங்களில் பெரிதும் பயிற்சி அளிக்கப்பட்டது.',
        use: 'போரில், இராணுவத் தளத்தில்.',
        specialFeatures: 'போர் தந்திரங்கள், ஆயுதப் பயிற்சி, நுணுக்கமான தேர்வு.',
        image: 'images/arts/34.png',
      },

  ];

const ExploreAayarKalai = () => {
  const [selectedArt, setSelectedArt] = useState(null);

  const handleCardClick = (art) => {
    setSelectedArt(art);
  };

  return (
    <section className="explore-aayar-kalai">
      <h2>64 Aayar Kalai (Ancient Tamil Arts)</h2>
      <div className="aayar-kalai-gallery">
        {aayarKalaiList.map((art, index) => (
          <div key={index} className="aayar-kalai-card gallery-card" onClick={() => handleCardClick(art)}>
            <img src={art.image} alt={art.name} className="card-image" />
            <h3>{art.name}</h3>
          </div>
        ))}
      </div>

      {/* Modal to show selected art details */}
      {selectedArt && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedArt.name}</h2>
            <img src={selectedArt.image} alt={selectedArt.name} className="modal-image" />
            <p><strong>Description:</strong> {selectedArt.description}</p>
            <p><strong>History:</strong> {selectedArt.history}</p>
            <p><strong>Use:</strong> {selectedArt.use}</p>
            <p><strong>Special Features:</strong> {selectedArt.specialFeatures}</p>
            <button onClick={() => setSelectedArt(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExploreAayarKalai;
