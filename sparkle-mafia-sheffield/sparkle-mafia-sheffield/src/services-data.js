// Services content (used by the Home "What we do" list and the Services page).
// Yell lists Sparklemafiacleaningservices as a commercial cleaner; it also appears in Yell's Sheffield searches for
// office cleaners and factory cleaning. Deep, end of tenancy and home cleaning are added extras – CONFIRM with the owner.
module.exports = [
  { id: 'commercial-cleaning', icon: 'building', img: 'commercial-mopping', alt: 'Cleaner mopping a commercial floor', title: 'Commercial Cleaning', tag: 'Shops · Units · Premises',
    intro: 'We keep business premises spotless, from shops and showrooms to units and communal areas, so staff and customers always walk into a clean, professional space.',
    points: ['Entrances, receptions and customer areas', 'Floors swept, vacuumed and mopped', 'Washrooms cleaned and sanitised', 'Glass, mirrors and touch points', 'Scheduled around your opening hours'],
    more: ['We agree a clear cleaning specification with you before we start, so you always know what’s included.', 'Because we’re open 24 hours, cleaning can happen whenever your premises are quiet.'] },
  { id: 'office-cleaning', icon: 'users', img: 'bright-office', alt: 'Bright, tidy open-plan office', title: 'Office Cleaning', tag: 'Before or after hours',
    intro: 'Give your team a fresh, healthy office every morning. We clean desks, meeting rooms, kitchens and washrooms without getting in the way of your working day.',
    points: ['Desks, workstations and shared surfaces', 'Meeting rooms and breakout areas', 'Staff kitchens', 'Toilets and washrooms', 'Bins emptied and recycling sorted'],
    more: ['Choose daily, several times a week or weekly visits, at whatever time suits your office.'] },
  { id: 'factory-warehouse', icon: 'deep', img: 'warehouse-aisle', alt: 'Long, clean warehouse aisle with racking', title: 'Factory & Warehouse Cleaning', tag: 'Industrial · Logistics',
    intro: 'Clean, safe industrial spaces help keep your operation running. We clean factory floors, warehouse aisles, welfare facilities and offices on site.',
    points: ['Industrial and warehouse floors', 'Aisles and accessible racking areas', 'Canteens, welfare and changing rooms', 'Toilets and washrooms', 'On-site offices'],
    more: ['We work around shifts and production schedules, including nights and weekends.', 'Tell us the size of the site and any safety requirements when requesting a quote.'] },
  { id: 'deep-cleaning', icon: 'sparkle', img: 'meeting-room', alt: 'Spotless meeting room', title: 'Deep Cleaning', tag: 'One-off · Periodic',
    intro: 'When a space needs more than routine cleaning, our deep clean gets into every corner. It’s ideal before an inspection, after a refurbishment or as a periodic reset.',
    points: ['High and low-level dusting', 'Degreasing and descaling', 'Skirting boards, doors, frames and vents', 'Behind and under furniture', 'Thorough kitchen and washroom sanitising'],
    more: ['Deep cleans are quoted individually based on the size and condition of the space.'] },
  { id: 'end-of-tenancy', icon: 'key', img: 'hallway-minimal', alt: 'Empty, spotless room ready for handover', title: 'End of Tenancy Cleaning', tag: 'Tenants · Landlords · Agents',
    intro: 'Moving out or getting a property ready for new tenants? Our end of tenancy cleans cover the details that check-out inspections look for.',
    points: ['Kitchen including inside appliances', 'Inside cupboards and wardrobes', 'Bathrooms descaled and sanitised', 'Skirting, doors, sills and switches', 'Floors cleaned throughout'],
    more: ['Let us know the property size and move-out date and we’ll schedule around it.'] },
  { id: 'home-cleaning', icon: 'home', img: 'living-open', alt: 'Bright, freshly cleaned living room', title: 'Home Cleaning', tag: 'Regular · One-off',
    intro: 'Come home to a clean, calm space with regular or one-off home cleans that fit around your life.',
    points: ['Dusting and wiping throughout', 'Kitchen and bathroom cleaning', 'Vacuuming and mopping', 'Beds made and bins emptied', 'Weekly, fortnightly or one-off'],
    more: ['Tell us the size of your home and anything you’d like us to focus on.'] },
];
