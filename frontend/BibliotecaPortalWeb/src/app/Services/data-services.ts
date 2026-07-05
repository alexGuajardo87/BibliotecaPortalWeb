import { Injectable } from '@angular/core';

export interface Item {
  label: string;
  value: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataServices {

  private countries: Item[] = [
    { label: 'Afghanistan', value: '144', code: '144' }, { label: 'Albania', value: '114', code: '114' }, { label: 'Algeria', value: '98', code: '98' }, { label: 'American Samoa', value: '223', code: '223' }, { label: 'Andorra', value: '145', code: '145' },
    { label: 'Angola', value: '119', code: '119' }, { label: 'Anguilla', value: '4', code: '4' }, { label: 'Antigua and Barbuda', value: '147', code: '147' }, { label: 'Antilles (Dutch)', value: '207', code: '207' }, { label: 'Argentina', value: '5', code: '5' },
    { label: 'Armenia', value: '6', code: '6' }, { label: 'Aruba', value: '142', code: '142' }, { label: 'Australia', value: '1', code: '1' }, { label: 'Austria', value: '2', code: '2' }, { label: 'Azerbaijan', value: '3', code: '3' },
    { label: 'Bahamas', value: '80', code: '80' }, { label: 'Bahrain', value: '127', code: '127' }, { label: 'Bangladesh', value: '149', code: '149' }, { label: 'Barbados', value: '128', code: '128' }, { label: 'Belarus', value: '7', code: '7' },
    { label: 'Belgium', value: '9', code: '9' }, { label: 'Belize', value: '8', code: '8' }, { label: 'Benin', value: '151', code: '151' }, { label: 'Bermuda', value: '10', code: '10' }, { label: 'Bhutan', value: '152', code: '152' },
    { label: 'Bolivia', value: '123', code: '123' }, { label: 'Bosnia and Herzegovina', value: '79', code: '79' }, { label: 'Botswana', value: '100', code: '100' }, { label: 'Brazil', value: '12', code: '12' }, { label: 'British Virgin Islands', value: '154', code: '154' },
    { label: 'Brunei', value: '155', code: '155' }, { label: 'Bulgaria', value: '11', code: '11' }, { label: 'Burkina Faso', value: '156', code: '156' }, { label: 'Burundi', value: '157', code: '157' }, { label: 'Cambodia', value: '158', code: '158' },
    { label: 'Cameroon', value: '31', code: '31' }, { label: 'Canada', value: '32', code: '32' }, { label: 'Cape Verde', value: '159', code: '159' }, { label: 'Chad', value: '130', code: '130' }, { label: 'Chile', value: '81', code: '81' },
    { label: 'China', value: '35', code: '35' }, { label: 'Colombia', value: '82', code: '82' }, { label: 'Comoros', value: '164', code: '164' }, { label: 'Congo (Brazzaville)', value: '112', code: '112' }, { label: 'Congo (Kinshasa)', value: '165', code: '165' },
    { label: 'Cook Islands', value: '166', code: '166' }, { label: 'Costa Rica', value: '36', code: '36' }, { label: 'Croatia', value: '71', code: '71' }, { label: 'Cuba', value: '113', code: '113' }, { label: 'Cyprus', value: '33', code: '33' },
    { label: 'Czech Republic', value: '65', code: '65' }, { label: 'Denmark', value: '22', code: '22' }, { label: 'Djibouti', value: '169', code: '169' }, { label: 'East Timor', value: '171', code: '171' }, { label: 'Ecuador', value: '103', code: '103' },
    { label: 'Egypt', value: '23', code: '23' }, { label: 'El Salvador', value: '51', code: '51' }, { label: 'Equatorial Guinea', value: '172', code: '172' }, { label: 'Eritrea', value: '173', code: '173' }, { label: 'Estonia', value: '68', code: '68' },
    { label: 'Ethiopia', value: '121', code: '121' }, { label: 'Faroe Islands', value: '175', code: '175' }, { label: 'Fiji', value: '176', code: '176' }, { label: 'Finland', value: '63', code: '63' }, { label: 'France', value: '64', code: '64' },
    { label: 'French Polynesia', value: '178', code: '178' }, { label: 'Gabon', value: '180', code: '180' }, { label: 'Gambia', value: '181', code: '181' }, { label: 'Georgia', value: '21', code: '21' }, { label: 'Germany', value: '18', code: '18' },
    { label: 'Ghana', value: '105', code: '105' }, { label: 'Gibraltar', value: '143', code: '143' }, { label: 'Greece', value: '20', code: '20' }, { label: 'Greenland', value: '94', code: '94' }, { label: 'Grenada', value: '184', code: '184' },
    { label: 'Guadeloupe', value: '17', code: '17' }, { label: 'Guernsey', value: '186', code: '186' }, { label: 'Guinea', value: '187', code: '187' }, { label: 'Guinea-Bissau', value: '188', code: '188' }, { label: 'Guyana', value: '189', code: '189' },
    { label: 'Haiti', value: '16', code: '16' }, { label: 'Honduras', value: '137', code: '137' }, { label: 'Hong Kong', value: '73', code: '73' }, { label: 'Hungary', value: '14', code: '14' }, { label: 'Iceland', value: '83', code: '83' },
    { label: 'India', value: '25', code: '25' }, { label: 'Indonesia', value: '74', code: '74' }, { label: 'Iran', value: '26', code: '26' }, { label: 'Iraq', value: '140', code: '140' }, { label: 'Ireland', value: '27', code: '27' },
    { label: 'Isle of Man', value: '131', code: '131' }, { label: 'Israel', value: '24', code: '24' }, { label: 'Italy', value: '29', code: '29' }, { label: 'Ivory Coast', value: '168', code: '168' }, { label: 'Jamaica', value: '132', code: '132' },
    { label: 'Japan', value: '70', code: '70' }, { label: 'Jersey', value: '193', code: '193' }, { label: 'Jordan', value: '75', code: '75' }, { label: 'Kazakhstan', value: '30', code: '30' }, { label: 'Kenya', value: '97', code: '97' },
    { label: 'Kiribati', value: '195', code: '195' }, { label: 'Kuwait', value: '37', code: '37' }, { label: 'Kyrgyzstan', value: '34', code: '34' }, { label: 'Laos', value: '196', code: '196' }, { label: 'Latvia', value: '38', code: '38' },
    { label: 'Lebanon', value: '99', code: '99' }, { label: 'Lesotho', value: '197', code: '197' }, { label: 'Liberia', value: '198', code: '198' }, { label: 'Libya', value: '39', code: '39' }, { label: 'Liechtenstein', value: '126', code: '126' },
    { label: 'Lithuania', value: '40', code: '40' }, { label: 'Luxembourg', value: '41', code: '41' }, { label: 'Macedonia', value: '85', code: '85' }, { label: 'Madagascar', value: '134', code: '134' }, { label: 'Malawi', value: '125', code: '125' },
    { label: 'Malaysia', value: '76', code: '76' }, { label: 'Maldives', value: '200', code: '200' }, { label: 'Mali', value: '133', code: '133' }, { label: 'Malta', value: '86', code: '86' }, { label: 'Martinique', value: '201', code: '201' },
    { label: 'Mauritania', value: '108', code: '108' }, { label: 'Mauritius', value: '202', code: '202' }, { label: 'Mexico', value: '42', code: '42' }, { label: 'Moldova', value: '43', code: '43' }, { label: 'Monaco', value: '44', code: '44' },
    { label: 'Mongolia', value: '139', code: '139' }, { label: 'Morocco', value: '104', code: '104' }, { label: 'Mozambique', value: '117', code: '117' }, { label: 'Myanmar', value: '205', code: '205' }, { label: 'Namibia', value: '102', code: '102' },
    { label: 'Nauru', value: '206', code: '206' }, { label: 'Nepal', value: '107', code: '107' }, { label: 'Netherlands', value: '19', code: '19' }, { label: 'New Caledonia', value: '208', code: '208' }, { label: 'New Zealand', value: '45', code: '45' },
    { label: 'Nicaragua', value: '209', code: '209' }, { label: 'Niger', value: '210', code: '210' }, { label: 'Nigeria', value: '115', code: '115' }, { label: 'Norfolk Island', value: '212', code: '212' }, { label: 'North Korea', value: '84', code: '84' },
    { label: 'Norway', value: '46', code: '46' }, { label: 'Oman', value: '213', code: '213' }, { label: 'Pakistan', value: '87', code: '87' }, { label: 'Panama', value: '124', code: '124' }, { label: 'Papua New Guinea', value: '88', code: '88' },
    { label: 'Paraguay', value: '110', code: '110' }, { label: 'Peru', value: '89', code: '89' }, { label: 'Philippines', value: '90', code: '90' }, { label: 'Pitcairn Island', value: '215', code: '215' }, { label: 'Poland', value: '47', code: '47' },
    { label: 'Portugal', value: '48', code: '48' }, { label: 'Puerto Rico', value: '246', code: '246' }, { label: 'Qatar', value: '216', code: '216' }, { label: 'Reunion', value: '49', code: '49' }, { label: 'Romania', value: '72', code: '72' },
    { label: 'Russia', value: '50', code: '50' }, { label: 'Rwanda', value: '217', code: '217' }, { label: 'Saint Helena', value: '218', code: '218' }, { label: 'Saint Kitts and Nevis', value: '219', code: '219' }, { label: 'Saint Lucia', value: '220', code: '220' },
    { label: 'Saint Pierre and Miquelon', value: '221', code: '221' }, { label: 'Saint Vincent and the Grenadines', value: '222', code: '222' }, { label: 'San Marino', value: '224', code: '224' }, { label: 'Sao Tome and Principe', value: '225', code: '225' }, { label: 'Saudi Arabia', value: '91', code: '91' },
    { label: 'Senegal', value: '135', code: '135' }, { label: 'Serbia and Montenegro', value: '226', code: '226' }, { label: 'Seychelles', value: '109', code: '109' }, { label: 'Sierra Leone', value: '227', code: '227' }, { label: 'Singapore', value: '77', code: '77' },
    { label: 'Solomon Islands', value: '228', code: '228' }, { label: 'Somalia', value: '229', code: '229' }, { label: 'South Africa', value: '141', code: '141' }, { label: 'South Korea', value: '69', code: '69' }, { label: 'Spain', value: '28', code: '28' },
    { label: 'Sri Lanka', value: '120', code: '120' }, { label: 'Sudan', value: '232', code: '232' }, { label: 'Suriname', value: '54', code: '54' }, { label: 'Swaziland', value: '234', code: '234' }, { label: 'Sweden', value: '67', code: '67' },
    { label: 'Switzerland', value: '66', code: '66' }, { label: 'Syria', value: '106', code: '106' }, { label: 'Taiwan', value: '78', code: '78' }, { label: 'Tajikistan', value: '56', code: '56' }, { label: 'Tanzania', value: '101', code: '101' },
    { label: 'Thailand', value: '92', code: '92' }, { label: 'Togo', value: '136', code: '136' }, { label: 'Tokelau', value: '235', code: '235' }, { label: 'Tonga', value: '236', code: '236' }, { label: 'Trinidad and Tobago', value: '237', code: '237' },
    { label: 'Tunisia', value: '122', code: '122' }, { label: 'Turkey', value: '59', code: '59' }, { label: 'Turkmenistan', value: '57', code: '57' }, { label: 'Tuvalu', value: '239', code: '239' }, { label: 'Uganda', value: '60', code: '60' },
    { label: 'Ukraine', value: '62', code: '62' }, { label: 'United Arab Emirates', value: '93', code: '93' }, { label: 'United Kingdom', value: '13', code: '13' }, { label: 'United States', value: '55', code: '55' }, { label: 'Uruguay', value: '111', code: '111' },
    { label: 'Uzbekistan', value: '61', code: '61' }, { label: 'Vanuatu', value: '240', code: '240' }, { label: 'Venezuela', value: '95', code: '95' }, { label: 'Vietnam', value: '15', code: '15' }, { label: 'Wallis and Futuna', value: '241', code: '241' },
    { label: 'Western Sahara', value: '242', code: '242' }, { label: 'Yemen', value: '243', code: '243' }, { label: 'Zambia', value: '116', code: '116' }, { label: 'Zimbabwe', value: '96', code: '96' }
  ];

  private paises: Item[] = [
    { label: 'Afganistán', value: '144', code: '144' }, { label: 'Albania', value: '114', code: '114' }, { label: 'Alemania', value: '18', code: '18' }, { label: 'Algeria', value: '98', code: '98' }, { label: 'Andorra', value: '145', code: '145' },
    { label: 'Angola', value: '119', code: '119' }, { label: 'Anguilla', value: '4', code: '4' }, { label: 'Antigua y Barbuda', value: '147', code: '147' }, { label: 'Antillas Holandesas', value: '207', code: '207' }, { label: 'Arabia Saudita', value: '91', code: '91' },
    { label: 'Argentina', value: '5', code: '5' }, { label: 'Armenia', value: '6', code: '6' }, { label: 'Aruba', value: '142', code: '142' }, { label: 'Australia', value: '1', code: '1' }, { label: 'Austria', value: '2', code: '2' },
    { label: 'Azerbaiyán', value: '3', code: '3' }, { label: 'Bahamas', value: '80', code: '80' }, { label: 'Bahrein', value: '127', code: '127' }, { label: 'Bangladesh', value: '149', code: '149' }, { label: 'Barbados', value: '128', code: '128' },
    { label: 'Belice', value: '8', code: '8' }, { label: 'Bélgica', value: '9', code: '9' }, { label: 'Benín', value: '151', code: '151' }, { label: 'Bermudas', value: '10', code: '10' }, { label: 'Bielorrusia', value: '7', code: '7' },
    { label: 'Bolivia', value: '123', code: '123' }, { label: 'Bosnia y Herzegovina', value: '79', code: '79' }, { label: 'Botsuana', value: '100', code: '100' }, { label: 'Brasil', value: '12', code: '12' }, { label: 'Brunéi', value: '155', code: '155' },
    { label: 'Bulgaria', value: '11', code: '11' }, { label: 'Burkina Faso', value: '156', code: '156' }, { label: 'Burundi', value: '157', code: '157' }, { label: 'Bután', value: '152', code: '152' }, { label: 'Cabo Verde', value: '159', code: '159' },
    { label: 'Camboya', value: '158', code: '158' }, { label: 'Camerún', value: '31', code: '31' }, { label: 'Canadá', value: '32', code: '32' }, { label: 'Chad', value: '130', code: '130' }, { label: 'Chile', value: '81', code: '81' },
    { label: 'China', value: '35', code: '35' }, { label: 'Chipre', value: '33', code: '33' }, { label: 'Colombia', value: '82', code: '82' }, { label: 'Comores', value: '164', code: '164' }, { label: 'Congo (Brazzaville)', value: '112', code: '112' },
    { label: 'Congo (Kinshasa)', value: '165', code: '165' }, { label: 'Cook, Islas', value: '166', code: '166' }, { label: 'Corea del Norte', value: '84', code: '84' }, { label: 'Corea del Sur', value: '69', code: '69' }, { label: 'Costa de Marfil', value: '168', code: '168' },
    { label: 'Costa Rica', value: '36', code: '36' }, { label: 'Croacia', value: '71', code: '71' }, { label: 'Cuba', value: '113', code: '113' }, { label: 'Dinamarca', value: '22', code: '22' }, { label: 'Djibouti, Yibuti', value: '169', code: '169' },
    { label: 'Ecuador', value: '103', code: '103' }, { label: 'Egipto', value: '23', code: '23' }, { label: 'El Salvador', value: '51', code: '51' }, { label: 'Emiratos árabes Unidos', value: '93', code: '93' }, { label: 'Eritrea', value: '173', code: '173' },
    { label: 'Eslovaquia', value: '52', code: '52' }, { label: 'Eslovenia', value: '53', code: '53' }, { label: 'España', value: '28', code: '28' }, { label: 'Estados Unidos', value: '55', code: '55' }, { label: 'Estonia', value: '68', code: '68' },
    { label: 'Etiopía', value: '121', code: '121' }, { label: 'Feroe, Islas', value: '175', code: '175' }, { label: 'Filipinas', value: '90', code: '90' }, { label: 'Finlandia', value: '63', code: '63' }, { label: 'Fiyi', value: '176', code: '176' },
    { label: 'Francia', value: '64', code: '64' }, { label: 'Gabón', value: '180', code: '180' }, { label: 'Gambia', value: '181', code: '181' }, { label: 'Georgia', value: '21', code: '21' }, { label: 'Ghana', value: '105', code: '105' },
    { label: 'Gibraltar', value: '143', code: '143' }, { label: 'Granada', value: '184', code: '184' }, { label: 'Grecia', value: '20', code: '20' }, { label: 'Groenlandia', value: '94', code: '94' }, { label: 'Guadalupe', value: '17', code: '17' },
    { label: 'Guatemala', value: '185', code: '185' }, { label: 'Guernsey', value: '186', code: '186' }, { label: 'Guinea', value: '187', code: '187' }, { label: 'Guinea Ecuatorial', value: '172', code: '172' }, { label: 'Guinea-Bissau', value: '188', code: '188' },
    { label: 'Guyana', value: '189', code: '189' }, { label: 'Haiti', value: '16', code: '16' }, { label: 'Honduras', value: '137', code: '137' }, { label: 'Hong Kong', value: '73', code: '73' }, { label: 'Hungría', value: '14', code: '14' },
    { label: 'India', value: '25', code: '25' }, { label: 'Indonesia', value: '74', code: '74' }, { label: 'Irak', value: '140', code: '140' }, { label: 'Irán', value: '26', code: '26' }, { label: 'Irlanda', value: '27', code: '27' },
    { label: 'Isla Pitcairn', value: '215', code: '215' }, { label: 'Islandia', value: '83', code: '83' }, { label: 'Islas Salomón', value: '228', code: '228' }, { label: 'Islas Turcas y Caicos', value: '58', code: '58' }, { label: 'Islas Virgenes Británicas', value: '154', code: '154' },
    { label: 'Israel', value: '24', code: '24' }, { label: 'Italia', value: '29', code: '29' }, { label: 'Jamaica', value: '132', code: '132' }, { label: 'Japón', value: '70', code: '70' }, { label: 'Jersey', value: '193', code: '193' },
    { label: 'Jordania', value: '75', code: '75' }, { label: 'Kazajstán', value: '30', code: '30' }, { label: 'Kenia', value: '97', code: '97' }, { label: 'Kirguistán', value: '34', code: '34' }, { label: 'Kiribati', value: '195', code: '195' },
    { label: 'Kuwait', value: '37', code: '37' }, { label: 'Laos', value: '196', code: '196' }, { label: 'Lesotho', value: '197', code: '197' }, { label: 'Letonia', value: '38', code: '38' }, { label: 'Líbano', value: '99', code: '99' },
    { label: 'Liberia', value: '198', code: '198' }, { label: 'Libia', value: '39', code: '39' }, { label: 'Liechtenstein', value: '126', code: '126' }, { label: 'Lituania', value: '40', code: '40' }, { label: 'Luxemburgo', value: '41', code: '41' },
    { label: 'Macedonia', value: '85', code: '85' }, { label: 'Madagascar', value: '134', code: '134' }, { label: 'Malasia', value: '76', code: '76' }, { label: 'Malaui', value: '125', code: '125' }, { label: 'Maldivas', value: '200', code: '200' },
    { label: 'Malí', value: '133', code: '133' }, { label: 'Malta', value: '86', code: '86' }, { label: 'Man, Isla de', value: '131', code: '131' }, { label: 'Marruecos', value: '104', code: '104' }, { label: 'Martinica', value: '201', code: '201' },
    { label: 'Mauricio', value: '202', code: '202' }, { label: 'Mauritania', value: '108', code: '108' }, { label: 'México', value: '42', code: '42' }, { label: 'Moldavia', value: '43', code: '43' }, { label: 'Mónaco', value: '44', code: '44' },
    { label: 'Mongolia', value: '139', code: '139' }, { label: 'Mozambique', value: '117', code: '117' }, { label: 'Myanmar', value: '205', code: '205' }, { label: 'Namibia', value: '102', code: '102' }, { label: 'Nauru', value: '206', code: '206' },
    { label: 'Nepal', value: '107', code: '107' }, { label: 'Nicaragua', value: '209', code: '209' }, { label: 'Níger', value: '210', code: '210' }, { label: 'Nigeria', value: '115', code: '115' }, { label: 'Norfolk Island', value: '212', code: '212' },
    { label: 'Noruega', value: '46', code: '46' }, { label: 'Nueva Caledonia', value: '208', code: '208' }, { label: 'Nueva Zelanda', value: '45', code: '45' }, { label: 'Omán', value: '213', code: '213' }, { label: 'Países Bajos, Holanda', value: '19', code: '19' },
    { label: 'Pakistán', value: '87', code: '87' }, { label: 'Panamá', value: '124', code: '124' }, { label: 'Papúa-Nueva Guinea', value: '88', code: '88' }, { label: 'Paraguay', value: '110', code: '110' }, { label: 'Perú', value: '89', code: '89' },
    { label: 'Polinesia Francesa', value: '178', code: '178' }, { label: 'Polonia', value: '47', code: '47' }, { label: 'Portugal', value: '48', code: '48' }, { label: 'Puerto Rico', value: '246', code: '246' }, { label: 'Qatar', value: '216', code: '216' },
    { label: 'Reino Unido', value: '13', code: '13' }, { label: 'República Checa', value: '65', code: '65' }, { label: 'República Dominicana', value: '138', code: '138' }, { label: 'Reunión', value: '49', code: '49' }, { label: 'Ruanda', value: '217', code: '217' },
    { label: 'Rumanía', value: '72', code: '72' }, { label: 'Rusia', value: '50', code: '50' }, { label: 'Sáhara Occidental', value: '242', code: '242' }, { label: 'Samoa', value: '223', code: '223' }, { label: 'San Cristobal y Nevis', value: '219', code: '219' },
    { label: 'San Marino', value: '224', code: '224' }, { label: 'San Pedro y Miquelón', value: '221', code: '221' }, { label: 'San Tomé y Príncipe', value: '225', code: '225' }, { label: 'San Vincente y Granadinas', value: '222', code: '222' }, { label: 'Santa Elena', value: '218', code: '218' },
    { label: 'Santa Lucía', value: '220', code: '220' }, { label: 'Senegal', value: '135', code: '135' }, { label: 'Serbia y Montenegro', value: '226', code: '226' }, { label: 'Seychelles', value: '109', code: '109' }, { label: 'Sierra Leona', value: '227', code: '227' },
    { label: 'Singapur', value: '77', code: '77' }, { label: 'Siria', value: '106', code: '106' }, { label: 'Somalia', value: '229', code: '229' }, { label: 'Sri Lanka', value: '120', code: '120' }, { label: 'Sudáfrica', value: '141', code: '141' },
    { label: 'Sudán', value: '232', code: '232' }, { label: 'Suecia', value: '67', code: '67' }, { label: 'Suiza', value: '66', code: '66' }, { label: 'Surinam', value: '54', code: '54' }, { label: 'Swazilandia', value: '234', code: '234' },
    { label: 'Tadjikistan', value: '56', code: '56' }, { label: 'Tailandia', value: '92', code: '92' }, { label: 'Taiwan', value: '78', code: '78' }, { label: 'Tanzania', value: '101', code: '101' }, { label: 'Timor Oriental', value: '171', code: '171' },
    { label: 'Togo', value: '136', code: '136' }, { label: 'Tokelau', value: '235', code: '235' }, { label: 'Tonga', value: '236', code: '236' }, { label: 'Trinidad y Tobago', value: '237', code: '237' }, { label: 'Túnez', value: '122', code: '122' },
    { label: 'Turkmenistan', value: '57', code: '57' }, { label: 'Turquía', value: '59', code: '59' }, { label: 'Tuvalu', value: '239', code: '239' }, { label: 'Ucrania', value: '62', code: '62' }, { label: 'Uganda', value: '60', code: '60' },
    { label: 'Uruguay', value: '111', code: '111' }, { label: 'Uzbekistán', value: '61', code: '61' }, { label: 'Vanuatu', value: '240', code: '240' }, { label: 'Venezuela', value: '95', code: '95' }, { label: 'Vietnam', value: '15', code: '15' },
    { label: 'Wallis y Futuna', value: '241', code: '241' }, { label: 'Yemen', value: '243', code: '243' }, { label: 'Zambia', value: '116', code: '116' }, { label: 'Zimbabwe', value: '96', code: '96' }
  ];

  private estadosMexico: Item[] = [
    { label: 'Aguascalientes', value: '1', code: '1' }, { label: 'Baja California', value: '2', code: '2' }, { label: 'Baja California Sur', value: '3', code: '3' }, { label: 'Campeche', value: '4', code: '4' }, { label: 'Chiapas', value: '5', code: '5' },
    { label: 'Chihuahua', value: '6', code: '6' }, { label: 'Coahuila', value: '7', code: '7' }, { label: 'Colima', value: '8', code: '8' }, { label: 'Ciudad de México', value: '9', code: '9' }, { label: 'Durango', value: '10', code: '10' },
    { label: 'Guanajuato', value: '11', code: '11' }, { label: 'Guerrero', value: '12', code: '12' }, { label: 'Hidalgo', value: '13', code: '13' }, { label: 'Jalisco', value: '14', code: '14' }, { label: 'México', value: '15', code: '15' },
    { label: 'Michoacán', value: '16', code: '16' }, { label: 'Morelos', value: '17', code: '17' }, { label: 'Nayarit', value: '18', code: '18' }, { label: 'Nuevo León', value: '19', code: '19' }, { label: 'Oaxaca', value: '20', code: '20' },
    { label: 'Puebla', value: '21', code: '21' }, { label: 'Querétaro', value: '22', code: '22' }, { label: 'Quintana Roo', value: '23', code: '23' }, { label: 'San Luis Potosí', value: '24', code: '24' }, { label: 'Sinaloa', value: '25', code: '25' },
    { label: 'Sonora', value: '26', code: '26' }, { label: 'Tabasco', value: '27', code: '27' }, { label: 'Tamaulipas', value: '28', code: '28' }, { label: 'Tlaxcala', value: '29', code: '29' }, { label: 'Veracruz', value: '30', code: '30' },
    { label: 'Yucatán', value: '31', code: '31' }, { label: 'Zacatecas', value: '32', code: '32' }
  ];

   private ciudadesSinaloa: Item[] = [
  { label: 'Ahome', value: '25001', code: '25001' }, { label: 'Angostura', value: '25002', code: '25002' }, { label: 'Badiraguato', value: '25003', code: '25003' }, { label: 'Choix', value: '25004', code: '25004' }, { label: 'Concordia', value: '25005', code: '25005' },
  { label: 'Cosalá', value: '25006', code: '25006' }, { label: 'Culiacán', value: '25007', code: '25007' }, { label: 'El Fuerte', value: '25008', code: '25008' }, { label: 'Elota', value: '25009', code: '25009' }, { label: 'Escuinapa', value: '25010', code: '25010' },
  { label: 'Guasave', value: '25011', code: '25011' }, { label: 'Mazatlán', value: '25012', code: '25012' }, { label: 'Mocorito', value: '25013', code: '25013' }, { label: 'Rosario', value: '25014', code: '25014' }, { label: 'Salvador Alvarado', value: '25015', code: '25015' },
  { label: 'San Ignacio', value: '25016', code: '25016' }, { label: 'Sinaloa', value: '25017', code: '25017' }, { label: 'Navolato', value: '25018', code: '25018' }
];


  getCountries(): Item[] {
    return [...this.countries];
  }

  getPaises(): Item[] {
    return [...this.paises];
  }

  getEstadosMexico(): Item[] {
    return [...this.estadosMexico];
  }

  getCiudadesSinaloa(): Item[] {
    return [...this.ciudadesSinaloa];
  }
}
