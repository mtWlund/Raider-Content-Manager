/**
 * All credits to Trikas.
 * Go here and thank the man!
 * Discord: https://discord.gg/4625d8ccgz
 * Donate beer money:
 * PayPal:  https://www.paypal.com/donate/?hosted_button_id=AR22CNHWXLQ4L 
 * Patreon: https://www.patreon.com/trikas
 * 
 * General functions. Again more functions and features from Trikas that just blows your mind! Can someone please bring this guy a beer?!
 * Thank you Trikas if you ever read this; All credits to you mate!
 */

// Trikas you brilliant man!
function getRaidHelperRoles(spec) {
  switch (spec) {
    case 'Protection':
    case 'Feral Bear':
    case 'Blood_Tank':
    case 'Frost_Tank':
    case 'Unholy_Tank':
      return RAIDHELPERSRoles['Tank'];
    case 'Restoration':
    case 'Holy':
    case 'Discipline':
      return RAIDHELPERSRoles['Heal'];
    case 'Fury':
    case 'Arms':
    case 'Retribution':
    case 'Blood_DPS':
    case 'Frost_DPS':
    case 'Unholy_DPS':
    case 'Enhancement':
    case 'Feral Cat':
    case 'Assassination':
    case 'Combat':
    case 'Subtlety':
      return RAIDHELPERSRoles['Melee'];
    default: {
      return RAIDHELPERSRoles['Range'];
    }
  }
}

// And this was even better! Awesome!
function convertRaidHClassToWoWClass(signup) {
  if (signup.isConfirmed === 'cancelled') {
    return 'Cancelled';
  } else if (signup.class === 'DK') {
    return 'Death Knight';
  } else {
    switch (signup.spec) {
      case 'Protection':
        return 'Warrior';
      case 'Protection1':
        return 'Paladin';
      case 'Guardian':
        return 'Druid';
      case 'Blood':
      case 'Blood_Tank':
      case 'Frost_Tank':
      case 'Unholy_Tank':
        return 'Death Knight';
      default: {
        return signup.class;
      }
    }
  }
}

function convertWoWClassToRaidHClass(wowClass, spec) {
  if (wowClass === 'Warrior' && spec === 'Protection') {
    return 'Tank';
  } else if (wowClass === 'Paladin' && spec === 'Protection') {
    return 'Tank';
  } else if (wowClass === 'Druid' && spec === 'Feral Bear') {
    return 'Tank';
  } else if (wowClass === 'Death Knight' && spec === 'Blood') {
    return 'Tank';
  } else if (wowClass === 'Death Knight') {
    return 'DK';
  } else if (wowClass === '#REF!') {
    return undefined;
  } else {
    return wowClass;
  }
}

function convertRaidHSpecToWoWSpec(signup) {
  switch (signup.spec) {
    case 'Holy1':
      return 'Holy';
    case 'Restoration1':
      return 'Restoration';
    case 'Protection1':
      return 'Protection';
    case 'Guardian':
      return 'Feral Bear';
    case 'Feral':
      return 'Feral Cat';
    case 'Beastmastery':
      return 'Beast Mastery';
    case 'Marksmanship':
      return 'Marksman';
    case 'Frost1':
      return 'Frost_DPS';
    case 'Unholy':
      return 'Unholy_DPS';
    default:
      return signup.spec;
  }
}

function convertWoWSpecToRaidHSpec(wowClass, spec) {
  if        (wowClass === 'Paladin' && spec === 'Protection') {
    return 'Protection1';
  } else if (wowClass === 'Paladin' && spec === 'Holy') {
    return 'Holy1';
  } else if (wowClass === 'Shaman' && spec === 'Restoration') {
    return 'Restoration1';
  } else if (wowClass === 'Druid' && spec === 'Feral Bear') {
    return 'Guardian';
  } else if (wowClass === 'Druid' && spec === 'Feral Cat') {
    return 'Feral';
  } else if (wowClass === 'Hunter' && spec === 'Beast Mastery') {
    return 'Beastmastery';
  } else if (wowClass === 'Hunter' && spec === 'Marksman') {
    return 'Marksmanship';
  } else  if (wowClass === 'Death Knight' && spec === 'Blood') {
    return 'Blood_Tank';
  } else  if (wowClass === 'Death Knight' && spec === 'Frost') {
    return 'Frost_DPS';
  } else  if (wowClass === 'Death Knight' && spec === 'Unholy') {
    return 'Unholy_DPS';
  } else {
    return spec;
  }
}