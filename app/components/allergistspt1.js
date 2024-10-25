//page 1 to 2 https://psaai.org/find-an-allergist/?pagenum=2

const allergists = [
  {
    city: "QUEZON CITY",
    name: "ABELLA-BORGONIA, JEANNETTE",
    hospital: "Dr. Fe del Mundo Medical Center",
    schedule: "Monday/Wednesday/Friday",
    platforms: ["Doxy.me", "Facebook", "Platform c/o hospital"],
    contact: "09228578198"
  },
  {
    city: "MUNTINLUPA CITY",
    name: "ABONG, JOVILIA M.",
    hospital: "Asian Hospital and Medical Center",
    unit: "MAB unit 607",
    schedule: "Tuesday/Thursday 10:00 AM - 12:00 NN",
    platforms: ["Doxy.me", "SeriousMD"],
    contact: "87719214"
  },
  {
    city: "DASMARIÑAS, CAVITE",
    name: "ABONG, JOVILIA M.",
    hospital: "De Lasalle University Medical Center",
    unit: "MAC 529",
    schedule: "Monday/Wednesday/Friday 1:00 PM",
    platforms: ["Doxy.me", "SeriousMD"],
    contact: "9883100 local 5529"
  },
  {
    city: "MANILA",
    name: "ABONG, JOVILIA M.",
    hospital: "Manila Doctors' Hospital",
    unit: "Room 218",
    schedule: "Tuesday/Saturday 1:00 PM - 3:00 PM",
    platforms: ["Doxy.me", "SeriousMD"],
    contact: "85580888"
  },
  {
    city: "TACLOBAN CITY",
    name: "ADOLFO, MA. ROSITA O.",
    hospital: "RTR Hospital",
    unit: "OPD 1 Room 1",
    schedule: "Monday to Saturday 11:00 AM - 2:00 PM",
    contact: "09989913711"
  },
  {
    city: "TACLOBAN CITY",
    name: "ADOLFO, MA. ROSITA O.",
    hospital: "ACE Medical Center",
    schedule: "By appointment",
    contact: "09989913711"
  },
  {
    city: "MUNTINLUPA CITY",
    name: "AGCAOILI-DE JESUS, MARIA SOCORRO L.",
    hospital: "Healthway Medical Clinic",
    schedule: "Wednesday 4:00 PM - 6:00 PM, Sunday 12:00 NN - 3:00 PM",
    platforms: ["SeriousMD"],
    contact: "09178558100"
  },
  {
    city: "SANTA ROSA, LAGUNA",
    name: "AGCAOILI-DE JESUS, MARIA SOCORRO L.",
    hospital: "Marian Hospital",
    schedule: "Tuesday/Thursday 2:00 PM - 4:00 PM",
    platforms: ["SeriousMD"],
    contact: "09667050639"
  },
  {
    city: "SANTA ROSA, LAGUNA",
    name: "AGCAOILI-DE JESUS, MARIA SOCORRO L.",
    hospital: "New Sinai MDI Hospital",
    schedule: "Wednesday 12:00 NN - 3:00 PM, Saturday 1:00 PM -5:00 PM",
    platforms: ["SeriousMD"],
    contact: "09171806534"
  },
  {
    city: "MAKATI CITY",
    name: "AGCAOILI-DE JESUS, MARIA SOCORRO L.",
    hospital: "Medical Plaza Makati",
    schedule: "Thursday 10:00 - 12:00 NN",
    platforms: ["SeriousMD"],
    contact: "88179810/09199914402"
  },
  {
    city: "PASIG",
    name: "AGUSTIN-KASALA, MARIA CARMELA",
    hospital: "The Medical City",
    unit: "MATI 802",
    schedule: "Tuesday/Thursday/Friday 1:00 PM - 3:00 PM",
    platforms: ["Messenger"],
    contact: "86341327/09176304810"
  },
  {
    city: "MANILA",
    name: "ALAVA, HILDA DIANA A.",
    hospital: "Manila Doctors' Hospital",
    unit: "Room 1111 NTMT2 Building",
    schedule: "Tuesday/Thursday/Saturday 10:00 AM - 12:00 NN",
    contact: "85580888 local 4918/09957948692 (secretary)"
  },
  {
    city: "QUEZON CITY",
    name: "ALBERTO, NENITA L.",
    hospital: "Capitol Medical Center",
    unit: "MAB Room 208",
    schedule: "Wednesday 10:00 AM - 12:00 NN, Saturday 8:00 AM - 11:00 AM",
    platforms: ["Viber", "Facebook"],
    contact: "83723825 local 3235"
  },
  {
    city: "QUEZON CITY",
    name: "ALBERTO, NENITA L.",
    hospital: "NLA DERMATOLOGY, REGALIA TOWER B, 150 P.Tuazon St., Cubao",
    unit: "Unit 126, 1st floor",
    schedule: "Monday/Friday 10:00 AM - 1:00 PM, Saturday 12:00 NN - 2:00 PM",
    platforms: ["Viber", "Facebook"],
    contact: "83707911"
  },
  {
    city: "MANILA",
    name: "ALBERTO, NENITA L.",
    hospital: "UDL Building 1440 Taft Avenue (in front of PGH)",
    unit: "Room 301",
    schedule: "Tuesday/Thursday 10:00 AM - 1:00 PM",
    platforms: ["Viber", "Facebook"],
    contact: "8523-2519"
  },
  {
    city: "QUEZON CITY",
    name: "ALCANTARA, DANILO M.",
    hospital: "Healthway Medical Center, SM The Block, North Edsa",
    unit: "5th level",
    schedule: "Saturday 3:00 PM - 5:00 PM",
    contact: "0917-8078380"
  },
  {
    city: "QUEZON CITY",
    name: "ALCANTARA, DANILO M.",
    hospital: "Bernardino General Hospital Quirino Highway",
    schedule: "Monday/Wednesday/Friday/Saturday 8:00 AM - 12:00 NN",
    contact: "0908-8807199"
  },
  {
    city: "PASIG",
    name: "ALCANTARA, DANILO M.",
    hospital: "Bernardino General Hospital Zabarte Road",
    schedule: "Tuesday and Thursday, 2:00 PM - 5:00 PM",
    contact: "0908-8804795"
  },
  {
    city: "QUEZON CITY",
    name: "ALENTAJAN-ALETA, LARA THERESA",
    schedule: "Doxy.me/immunologistmd (by appointment)",
    contact: "drlara.aleta51@gmail.com"
  },
  {
    city: "PASIG",
    name: "ALIKPALA-CUAJUNCO, EILEEN SIMONE",
    hospital: "The Medical City",
    unit: "MATI Room 1209",
    schedule: "Monday/Tuesday/Wednesday/Friday/Saturday 10:00 AM - 12:00 NN by appointment",
    contact: "86336686"
  },
  {
    city: "QUEZON CITY",
    name: "ANDAYA, AGNES G.",
    hospital: "St. Luke's Medical Center",
    unit: "Room 424",
    schedule: "Monday/Friday 4:00 PM - 6:00 PM",
    platforms: ["Zoom", "Messenger"],
    contact: "09338593730"
  },
  {
    city: "MANILA",
    name: "ANDAYA, AGNES G.",
    hospital: "University of Santo Tomas Hospital",
    unit: "Room 426",
    schedule: "Monday to Saturday 10:00 AM - 12:00 NN",
    platforms: ["Zoom", "Messenger"],
    contact: "89255789"
  },
  {
    city: "DAVAO CITY",
    name: "ANG, MARIA CARMEN D.",
    hospital: "San Pedro Hospital",
    unit: "Room 505",
    schedule: "Tuesday/Thursday/Saturday by appointment",
    platforms: ["Zoom", "Messenger"],
    contact: "09436910656"
  },
  {
    city: "MAKATI CITY",
    name: "AQUINO-BIOLENA, CAROLINE C.",
    hospital: "Makati Medical Center",
    schedule: "Friday 3:00 PM - 5:00 PM",
    platforms: ["Facebook", "Zoom"],
    contact: "88888999/09985330630"
  }
];

export default allergists;
