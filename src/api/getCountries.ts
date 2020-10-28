/**
 * A single country entry in the databse
 * @property {number} id - The id of the country on the backend
 * @property {string} code - The two letter country code
 * @property {string} name - The full name of the country
 */
interface Country {
    id: number;
    code: string;
    name: string;
}

// A mapping from all countries to their country code
// The backend can send this information but because we host on Heroku free tier for now getting this can be slow
const COUNTRIES = [
    {
        code: 'AF',
        id: 1,
        name: 'Afghanistan',
    },
    {
        code: 'AX',
        id: 2,
        name: 'Åland Islands',
    },
    {
        code: 'AL',
        id: 3,
        name: 'Albania',
    },
    {
        code: 'DZ',
        id: 4,
        name: 'Algeria',
    },
    {
        code: 'AS',
        id: 5,
        name: 'American Samoa',
    },
    {
        code: 'AD',
        id: 6,
        name: 'Andorra',
    },
    {
        code: 'AO',
        id: 7,
        name: 'Angola',
    },
    {
        code: 'AI',
        id: 8,
        name: 'Anguilla',
    },
    {
        code: 'AQ',
        id: 9,
        name: 'Antarctica',
    },
    {
        code: 'AG',
        id: 10,
        name: 'Antigua and Barbuda',
    },
    {
        code: 'AR',
        id: 11,
        name: 'Argentina',
    },
    {
        code: 'AM',
        id: 12,
        name: 'Armenia',
    },
    {
        code: 'AW',
        id: 13,
        name: 'Aruba',
    },
    {
        code: 'AU',
        id: 14,
        name: 'Australia',
    },
    {
        code: 'AT',
        id: 15,
        name: 'Austria',
    },
    {
        code: 'AZ',
        id: 16,
        name: 'Azerbaijan',
    },
    {
        code: 'BS',
        id: 17,
        name: 'Bahamas',
    },
    {
        code: 'BH',
        id: 18,
        name: 'Bahrain',
    },
    {
        code: 'BD',
        id: 19,
        name: 'Bangladesh',
    },
    {
        code: 'BB',
        id: 20,
        name: 'Barbados',
    },
    {
        code: 'BY',
        id: 21,
        name: 'Belarus',
    },
    {
        code: 'BE',
        id: 22,
        name: 'Belgium',
    },
    {
        code: 'BZ',
        id: 23,
        name: 'Belize',
    },
    {
        code: 'BJ',
        id: 24,
        name: 'Benin',
    },
    {
        code: 'BM',
        id: 25,
        name: 'Bermuda',
    },
    {
        code: 'BT',
        id: 26,
        name: 'Bhutan',
    },
    {
        code: 'BO',
        id: 27,
        name: 'Bolivia, Plurinational State of',
    },
    {
        code: 'BQ',
        id: 28,
        name: 'Bonaire, Sint Eustatius and Saba',
    },
    {
        code: 'BA',
        id: 29,
        name: 'Bosnia and Herzegovina',
    },
    {
        code: 'BW',
        id: 30,
        name: 'Botswana',
    },
    {
        code: 'BV',
        id: 31,
        name: 'Bouvet Island',
    },
    {
        code: 'BR',
        id: 32,
        name: 'Brazil',
    },
    {
        code: 'IO',
        id: 33,
        name: 'British Indian Ocean Territory',
    },
    {
        code: 'BN',
        id: 34,
        name: 'Brunei Darussalam',
    },
    {
        code: 'BG',
        id: 35,
        name: 'Bulgaria',
    },
    {
        code: 'BF',
        id: 36,
        name: 'Burkina Faso',
    },
    {
        code: 'BI',
        id: 37,
        name: 'Burundi',
    },
    {
        code: 'KH',
        id: 38,
        name: 'Cambodia',
    },
    {
        code: 'CM',
        id: 39,
        name: 'Cameroon',
    },
    {
        code: 'CA',
        id: 40,
        name: 'Canada',
    },
    {
        code: 'CV',
        id: 41,
        name: 'Cape Verde',
    },
    {
        code: 'KY',
        id: 42,
        name: 'Cayman Islands',
    },
    {
        code: 'CF',
        id: 43,
        name: 'Central African Republic',
    },
    {
        code: 'TD',
        id: 44,
        name: 'Chad',
    },
    {
        code: 'CL',
        id: 45,
        name: 'Chile',
    },
    {
        code: 'CN',
        id: 46,
        name: 'China',
    },
    {
        code: 'CX',
        id: 47,
        name: 'Christmas Island',
    },
    {
        code: 'CC',
        id: 48,
        name: 'Cocos (Keeling) Islands',
    },
    {
        code: 'CO',
        id: 49,
        name: 'Colombia',
    },
    {
        code: 'KM',
        id: 50,
        name: 'Comoros',
    },
    {
        code: 'CG',
        id: 51,
        name: 'Congo',
    },
    {
        code: 'CD',
        id: 52,
        name: 'Congo, the Democratic Republic of the',
    },
    {
        code: 'CK',
        id: 53,
        name: 'Cook Islands',
    },
    {
        code: 'CR',
        id: 54,
        name: 'Costa Rica',
    },
    {
        code: 'CI',
        id: 55,
        name: "Côte d'Ivoire",
    },
    {
        code: 'HR',
        id: 56,
        name: 'Croatia',
    },
    {
        code: 'CU',
        id: 57,
        name: 'Cuba',
    },
    {
        code: 'CW',
        id: 58,
        name: 'Curaçao',
    },
    {
        code: 'CY',
        id: 59,
        name: 'Cyprus',
    },
    {
        code: 'CZ',
        id: 60,
        name: 'Czech Republic',
    },
    {
        code: 'DK',
        id: 61,
        name: 'Denmark',
    },
    {
        code: 'DJ',
        id: 62,
        name: 'Djibouti',
    },
    {
        code: 'DM',
        id: 63,
        name: 'Dominica',
    },
    {
        code: 'DO',
        id: 64,
        name: 'Dominican Republic',
    },
    {
        code: 'EC',
        id: 65,
        name: 'Ecuador',
    },
    {
        code: 'EG',
        id: 66,
        name: 'Egypt',
    },
    {
        code: 'SV',
        id: 67,
        name: 'El Salvador',
    },
    {
        code: 'GQ',
        id: 68,
        name: 'Equatorial Guinea',
    },
    {
        code: 'ER',
        id: 69,
        name: 'Eritrea',
    },
    {
        code: 'EE',
        id: 70,
        name: 'Estonia',
    },
    {
        code: 'ET',
        id: 71,
        name: 'Ethiopia',
    },
    {
        code: 'FK',
        id: 72,
        name: 'Falkland Islands (Malvinas)',
    },
    {
        code: 'FO',
        id: 73,
        name: 'Faroe Islands',
    },
    {
        code: 'FJ',
        id: 74,
        name: 'Fiji',
    },
    {
        code: 'FI',
        id: 75,
        name: 'Finland',
    },
    {
        code: 'FR',
        id: 76,
        name: 'France',
    },
    {
        code: 'GF',
        id: 77,
        name: 'French Guiana',
    },
    {
        code: 'PF',
        id: 78,
        name: 'French Polynesia',
    },
    {
        code: 'TF',
        id: 79,
        name: 'French Southern Territories',
    },
    {
        code: 'GA',
        id: 80,
        name: 'Gabon',
    },
    {
        code: 'GM',
        id: 81,
        name: 'Gambia',
    },
    {
        code: 'GE',
        id: 82,
        name: 'Georgia',
    },
    {
        code: 'DE',
        id: 83,
        name: 'Germany',
    },
    {
        code: 'GH',
        id: 84,
        name: 'Ghana',
    },
    {
        code: 'GI',
        id: 85,
        name: 'Gibraltar',
    },
    {
        code: 'GR',
        id: 86,
        name: 'Greece',
    },
    {
        code: 'GL',
        id: 87,
        name: 'Greenland',
    },
    {
        code: 'GD',
        id: 88,
        name: 'Grenada',
    },
    {
        code: 'GP',
        id: 89,
        name: 'Guadeloupe',
    },
    {
        code: 'GU',
        id: 90,
        name: 'Guam',
    },
    {
        code: 'GT',
        id: 91,
        name: 'Guatemala',
    },
    {
        code: 'GG',
        id: 92,
        name: 'Guernsey',
    },
    {
        code: 'GN',
        id: 93,
        name: 'Guinea',
    },
    {
        code: 'GW',
        id: 94,
        name: 'Guinea-Bissau',
    },
    {
        code: 'GY',
        id: 95,
        name: 'Guyana',
    },
    {
        code: 'HT',
        id: 96,
        name: 'Haiti',
    },
    {
        code: 'HM',
        id: 97,
        name: 'Heard Island and McDonald Islands',
    },
    {
        code: 'VA',
        id: 98,
        name: 'Holy See (Vatican City State)',
    },
    {
        code: 'HN',
        id: 99,
        name: 'Honduras',
    },
    {
        code: 'HK',
        id: 100,
        name: 'Hong Kong',
    },
    {
        code: 'HU',
        id: 101,
        name: 'Hungary',
    },
    {
        code: 'IS',
        id: 102,
        name: 'Iceland',
    },
    {
        code: 'IN',
        id: 103,
        name: 'India',
    },
    {
        code: 'ID',
        id: 104,
        name: 'Indonesia',
    },
    {
        code: 'IR',
        id: 105,
        name: 'Iran, Islamic Republic of',
    },
    {
        code: 'IQ',
        id: 106,
        name: 'Iraq',
    },
    {
        code: 'IE',
        id: 107,
        name: 'Ireland',
    },
    {
        code: 'IM',
        id: 108,
        name: 'Isle of Man',
    },
    {
        code: 'IL',
        id: 109,
        name: 'Israel',
    },
    {
        code: 'IT',
        id: 110,
        name: 'Italy',
    },
    {
        code: 'JM',
        id: 111,
        name: 'Jamaica',
    },
    {
        code: 'JP',
        id: 112,
        name: 'Japan',
    },
    {
        code: 'JE',
        id: 113,
        name: 'Jersey',
    },
    {
        code: 'JO',
        id: 114,
        name: 'Jordan',
    },
    {
        code: 'KZ',
        id: 115,
        name: 'Kazakhstan',
    },
    {
        code: 'KE',
        id: 116,
        name: 'Kenya',
    },
    {
        code: 'KI',
        id: 117,
        name: 'Kiribati',
    },
    {
        code: 'KP',
        id: 118,
        name: "Korea, Democratic People's Republic of",
    },
    {
        code: 'KR',
        id: 119,
        name: 'Korea, Republic of',
    },
    {
        code: 'KW',
        id: 120,
        name: 'Kuwait',
    },
    {
        code: 'KG',
        id: 121,
        name: 'Kyrgyzstan',
    },
    {
        code: 'LA',
        id: 122,
        name: "Lao People's Democratic Republic",
    },
    {
        code: 'LV',
        id: 123,
        name: 'Latvia',
    },
    {
        code: 'LB',
        id: 124,
        name: 'Lebanon',
    },
    {
        code: 'LS',
        id: 125,
        name: 'Lesotho',
    },
    {
        code: 'LR',
        id: 126,
        name: 'Liberia',
    },
    {
        code: 'LY',
        id: 127,
        name: 'Libya',
    },
    {
        code: 'LI',
        id: 128,
        name: 'Liechtenstein',
    },
    {
        code: 'LT',
        id: 129,
        name: 'Lithuania',
    },
    {
        code: 'LU',
        id: 130,
        name: 'Luxembourg',
    },
    {
        code: 'MO',
        id: 131,
        name: 'Macao',
    },
    {
        code: 'MK',
        id: 132,
        name: 'Macedonia, the Former Yugoslav Republic of',
    },
    {
        code: 'MG',
        id: 133,
        name: 'Madagascar',
    },
    {
        code: 'MW',
        id: 134,
        name: 'Malawi',
    },
    {
        code: 'MY',
        id: 135,
        name: 'Malaysia',
    },
    {
        code: 'MV',
        id: 136,
        name: 'Maldives',
    },
    {
        code: 'ML',
        id: 137,
        name: 'Mali',
    },
    {
        code: 'MT',
        id: 138,
        name: 'Malta',
    },
    {
        code: 'MH',
        id: 139,
        name: 'Marshall Islands',
    },
    {
        code: 'MQ',
        id: 140,
        name: 'Martinique',
    },
    {
        code: 'MR',
        id: 141,
        name: 'Mauritania',
    },
    {
        code: 'MU',
        id: 142,
        name: 'Mauritius',
    },
    {
        code: 'YT',
        id: 143,
        name: 'Mayotte',
    },
    {
        code: 'MX',
        id: 144,
        name: 'Mexico',
    },
    {
        code: 'FM',
        id: 145,
        name: 'Micronesia, Federated States of',
    },
    {
        code: 'MD',
        id: 146,
        name: 'Moldova, Republic of',
    },
    {
        code: 'MC',
        id: 147,
        name: 'Monaco',
    },
    {
        code: 'MN',
        id: 148,
        name: 'Mongolia',
    },
    {
        code: 'ME',
        id: 149,
        name: 'Montenegro',
    },
    {
        code: 'MS',
        id: 150,
        name: 'Montserrat',
    },
    {
        code: 'MA',
        id: 151,
        name: 'Morocco',
    },
    {
        code: 'MZ',
        id: 152,
        name: 'Mozambique',
    },
    {
        code: 'MM',
        id: 153,
        name: 'Myanmar',
    },
    {
        code: 'NA',
        id: 154,
        name: 'Namibia',
    },
    {
        code: 'NR',
        id: 155,
        name: 'Nauru',
    },
    {
        code: 'NP',
        id: 156,
        name: 'Nepal',
    },
    {
        code: 'NL',
        id: 157,
        name: 'Netherlands',
    },
    {
        code: 'NC',
        id: 158,
        name: 'New Caledonia',
    },
    {
        code: 'NZ',
        id: 159,
        name: 'New Zealand',
    },
    {
        code: 'NI',
        id: 160,
        name: 'Nicaragua',
    },
    {
        code: 'NE',
        id: 161,
        name: 'Niger',
    },
    {
        code: 'NG',
        id: 162,
        name: 'Nigeria',
    },
    {
        code: 'NU',
        id: 163,
        name: 'Niue',
    },
    {
        code: 'NF',
        id: 164,
        name: 'Norfolk Island',
    },
    {
        code: 'MP',
        id: 165,
        name: 'Northern Mariana Islands',
    },
    {
        code: 'NO',
        id: 166,
        name: 'Norway',
    },
    {
        code: 'OM',
        id: 167,
        name: 'Oman',
    },
    {
        code: 'PK',
        id: 168,
        name: 'Pakistan',
    },
    {
        code: 'PW',
        id: 169,
        name: 'Palau',
    },
    {
        code: 'PS',
        id: 170,
        name: 'Palestine, State of',
    },
    {
        code: 'PA',
        id: 171,
        name: 'Panama',
    },
    {
        code: 'PG',
        id: 172,
        name: 'Papua New Guinea',
    },
    {
        code: 'PY',
        id: 173,
        name: 'Paraguay',
    },
    {
        code: 'PE',
        id: 174,
        name: 'Peru',
    },
    {
        code: 'PH',
        id: 175,
        name: 'Philippines',
    },
    {
        code: 'PN',
        id: 176,
        name: 'Pitcairn',
    },
    {
        code: 'PL',
        id: 177,
        name: 'Poland',
    },
    {
        code: 'PT',
        id: 178,
        name: 'Portugal',
    },
    {
        code: 'PR',
        id: 179,
        name: 'Puerto Rico',
    },
    {
        code: 'QA',
        id: 180,
        name: 'Qatar',
    },
    {
        code: 'RE',
        id: 181,
        name: 'Réunion',
    },
    {
        code: 'RO',
        id: 182,
        name: 'Romania',
    },
    {
        code: 'RU',
        id: 183,
        name: 'Russian Federation',
    },
    {
        code: 'RW',
        id: 184,
        name: 'Rwanda',
    },
    {
        code: 'BL',
        id: 185,
        name: 'Saint Barthélemy',
    },
    {
        code: 'SH',
        id: 186,
        name: 'Saint Helena, Ascension and Tristan da Cunha',
    },
    {
        code: 'KN',
        id: 187,
        name: 'Saint Kitts and Nevis',
    },
    {
        code: 'LC',
        id: 188,
        name: 'Saint Lucia',
    },
    {
        code: 'MF',
        id: 189,
        name: 'Saint Martin (French part)',
    },
    {
        code: 'PM',
        id: 190,
        name: 'Saint Pierre and Miquelon',
    },
    {
        code: 'VC',
        id: 191,
        name: 'Saint Vincent and the Grenadines',
    },
    {
        code: 'WS',
        id: 192,
        name: 'Samoa',
    },
    {
        code: 'SM',
        id: 193,
        name: 'San Marino',
    },
    {
        code: 'ST',
        id: 194,
        name: 'Sao Tome and Principe',
    },
    {
        code: 'SA',
        id: 195,
        name: 'Saudi Arabia',
    },
    {
        code: 'SN',
        id: 196,
        name: 'Senegal',
    },
    {
        code: 'RS',
        id: 197,
        name: 'Serbia',
    },
    {
        code: 'SC',
        id: 198,
        name: 'Seychelles',
    },
    {
        code: 'SL',
        id: 199,
        name: 'Sierra Leone',
    },
    {
        code: 'SG',
        id: 200,
        name: 'Singapore',
    },
    {
        code: 'SX',
        id: 201,
        name: 'Sint Maarten (Dutch part)',
    },
    {
        code: 'SK',
        id: 202,
        name: 'Slovakia',
    },
    {
        code: 'SI',
        id: 203,
        name: 'Slovenia',
    },
    {
        code: 'SB',
        id: 204,
        name: 'Solomon Islands',
    },
    {
        code: 'SO',
        id: 205,
        name: 'Somalia',
    },
    {
        code: 'ZA',
        id: 206,
        name: 'South Africa',
    },
    {
        code: 'GS',
        id: 207,
        name: 'South Georgia and the South Sandwich Islands',
    },
    {
        code: 'SS',
        id: 208,
        name: 'South Sudan',
    },
    {
        code: 'ES',
        id: 209,
        name: 'Spain',
    },
    {
        code: 'LK',
        id: 210,
        name: 'Sri Lanka',
    },
    {
        code: 'SD',
        id: 211,
        name: 'Sudan',
    },
    {
        code: 'SR',
        id: 212,
        name: 'Suriname',
    },
    {
        code: 'SJ',
        id: 213,
        name: 'Svalbard and Jan Mayen',
    },
    {
        code: 'SZ',
        id: 214,
        name: 'Swaziland',
    },
    {
        code: 'SE',
        id: 215,
        name: 'Sweden',
    },
    {
        code: 'CH',
        id: 216,
        name: 'Switzerland',
    },
    {
        code: 'SY',
        id: 217,
        name: 'Syrian Arab Republic',
    },
    {
        code: 'TW',
        id: 218,
        name: 'Taiwan, Province of China',
    },
    {
        code: 'TJ',
        id: 219,
        name: 'Tajikistan',
    },
    {
        code: 'TZ',
        id: 220,
        name: 'Tanzania, United Republic of',
    },
    {
        code: 'TH',
        id: 221,
        name: 'Thailand',
    },
    {
        code: 'TL',
        id: 222,
        name: 'Timor-Leste',
    },
    {
        code: 'TG',
        id: 223,
        name: 'Togo',
    },
    {
        code: 'TK',
        id: 224,
        name: 'Tokelau',
    },
    {
        code: 'TO',
        id: 225,
        name: 'Tonga',
    },
    {
        code: 'TT',
        id: 226,
        name: 'Trinidad and Tobago',
    },
    {
        code: 'TN',
        id: 227,
        name: 'Tunisia',
    },
    {
        code: 'TR',
        id: 228,
        name: 'Turkey',
    },
    {
        code: 'TM',
        id: 229,
        name: 'Turkmenistan',
    },
    {
        code: 'TC',
        id: 230,
        name: 'Turks and Caicos Islands',
    },
    {
        code: 'TV',
        id: 231,
        name: 'Tuvalu',
    },
    {
        code: 'UG',
        id: 232,
        name: 'Uganda',
    },
    {
        code: 'UA',
        id: 233,
        name: 'Ukraine',
    },
    {
        code: 'AE',
        id: 234,
        name: 'United Arab Emirates',
    },
    {
        code: 'GB',
        id: 235,
        name: 'United Kingdom',
    },
    {
        code: 'US',
        id: 236,
        name: 'United States',
    },
    {
        code: 'UM',
        id: 237,
        name: 'United States Minor Outlying Islands',
    },
    {
        code: 'UY',
        id: 238,
        name: 'Uruguay',
    },
    {
        code: 'UZ',
        id: 239,
        name: 'Uzbekistan',
    },
    {
        code: 'VU',
        id: 240,
        name: 'Vanuatu',
    },
    {
        code: 'VE',
        id: 241,
        name: 'Venezuela, Bolivarian Republic of',
    },
    {
        code: 'VN',
        id: 242,
        name: 'Viet Nam',
    },
    {
        code: 'VG',
        id: 243,
        name: 'Virgin Islands, British',
    },
    {
        code: 'VI',
        id: 244,
        name: 'Virgin Islands, U.S.',
    },
    {
        code: 'WF',
        id: 245,
        name: 'Wallis and Futuna',
    },
    {
        code: 'EH',
        id: 246,
        name: 'Western Sahara',
    },
    {
        code: 'YE',
        id: 247,
        name: 'Yemen',
    },
    {
        code: 'ZM',
        id: 248,
        name: 'Zambia',
    },
    {
        code: 'ZW',
        id: 249,
        name: 'Zimbabwe',
    },
];

/**
 * Get a list of all countries that a user may select when signing up
 */
const getCountries: () => Promise<Country[]> = async () => {
    // Weird syntax but maintains compatibility while we use this development version of COUNTRIES
    return await new Promise((resolve) => resolve(COUNTRIES));
};

export default getCountries;
