/**
 * Single source of truth for business details.
 * Source: Yell listing https://www.yell.com/biz/sparklemafiacleaningservices-sheffield-11060946/
 * (8 Kyle Crescent, Sheffield S5 8HQ · commercial cleaner · open 24 hours) plus the phone and email supplied by the client.
 * Edit here, then run `npm run build`. Items marked CONFIRM should be checked with the owner.
 */
module.exports = {
  name: 'Sparkle Mafia Cleaning Services',
  shortName: 'Sparkle Mafia',
  brandSub: 'Cleaning Services · Sheffield',
  url: 'https://www.sparklemafiacleaning.co.uk', // CONFIRM: final domain
  area: 'Sheffield & South Yorkshire',
  phone: '07502 372439',
  phoneIntl: '+447502372439',
  phoneHref: 'tel:+447502372439',
  // CONFIRM: that this mobile number is on WhatsApp
  whatsapp: 'https://wa.me/447502372439?text=' + encodeURIComponent("Hi Sparkle Mafia! I'd like a cleaning quote."),
  whatsappNumber: '447502372439',
  address: { street: '8 Kyle Crescent', city: 'Sheffield', postcode: 'S5 8HQ', country: 'GB' },
  addressLine: '8 Kyle Crescent, Sheffield S5 8HQ',
  mapQuery: '8 Kyle Crescent, Sheffield S5 8HQ',
  yell: 'https://www.yell.com/biz/sparklemafiacleaningservices-sheffield-11060946/',
  // Yell lists the business as "Open 24 hours". CONFIRM with the owner.
  hours: [
    ['Monday – Friday', 'Open 24 hours'],
    ['Saturday', 'Open 24 hours'],
    ['Sunday', 'Open 24 hours'],
  ],
  openFrom: 0, openTo: 24,
  openingHoursSchema: 'Mo-Su 00:00-23:59',
  hoursShort: 'Open 24 hours · 7 days',
  schemaType: 'LocalBusiness',
  schemaDescription: 'Commercial, office, factory and warehouse cleaning in Sheffield. Open 24 hours.',

  // Quote form + chatbot leads are emailed here via FormSubmit (formsubmit.co).
  // The FIRST submission sends a one-time activation email to this inbox – click the link in it once.
  email: 'sparkleglitzmafia@gmail.com',
  formEndpoint: null,

  socials: [
    { label: 'Sparkle Mafia on Yell', icon: 'star', url: 'https://www.yell.com/biz/sparklemafiacleaningservices-sheffield-11060946/' },
  ],
  services: [
    { id: 'commercial-cleaning', title: 'Commercial Cleaning', short: 'Spotless business premises, cleaned around your hours.' },
    { id: 'office-cleaning', title: 'Office Cleaning', short: 'Fresh, healthy offices every morning.' },
    { id: 'factory-warehouse', title: 'Factory & Warehouse Cleaning', short: 'Industrial floors, racking areas and welfare facilities.' },
    { id: 'deep-cleaning', title: 'Deep Cleaning', short: 'Top-to-bottom resets for any space.' },
    { id: 'end-of-tenancy', title: 'End of Tenancy Cleaning', short: 'Move-in and move-out cleans for tenants and landlords.' },
    { id: 'home-cleaning', title: 'Home Cleaning', short: 'Regular or one-off domestic cleans.' },
  ],
};
if (!module.exports.formEndpoint && module.exports.email) {
  module.exports.formEndpoint = 'https://formsubmit.co/ajax/' + module.exports.email;
}
