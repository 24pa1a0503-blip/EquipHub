export const INITIAL_EQUIPMENT = [
  {
    id: 'cat-320',
    title: 'CAT 320 Hydraulic Excavator',
    shortName: 'CAT 320 Excavator',
    category: 'Excavators',
    brand: 'Caterpillar',
    owner: 'Texas Heavy Ops Ltd.',
    ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCund9hJwy5iaWLy-Hn6_dHTcPrepUlEfVZI2Fp6IIF1oj4Bh97rhmlgO35VfiGoyH9G0uB8tZ_mno3eny2sF4ALJ7QnFVashxl4wHVeaAVSmGcQesEcC1N7KlpbIcr-mLHCjqGv-tZmR74G5ewP6x12FIciFx7h25gQV0NEXXSdcYYDDg8KSh6bxMw9bBj6d75CFEBbVSSNRNUh8dH8ccwhglY5dIVYfRNE_u5EkGRLTEWfORP4BLI',
    location: 'Dallas, TX Industrial Yard',
    distance: '20 km away',
    distanceKm: 20,
    dailyRate: 450,
    rating: 4.9,
    reviewsCount: 124,
    available: true,
    statusText: 'Available',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf7C104YlflkPCQlIUmAQYgrtcqZl0xjrVpgfTnI5ol3d-MOYS97VLVFndHfXhanIWl48TWPjJ7IHB3MaYWFHl2W6VSZ--bYsuAaj5X1Prf_d0Z5JIUb8z-Qm1ZyjCz0DVrvpvH_26B4TXDN83EcwbdoasLZPZjdTC9XWeAzax-Tg7GmtyWHgypDzUBN3aMyJEm5hqn6oWd2lQZAjkOAb1X7mJbzOq4a7mO9oPQn9iwSNKI13R6SzC',
    photosCount: 5,
    specs: {
      weight: '22,500 kg',
      power: '172 HP',
      digDepth: '6.7 m',
      engineHours: '2,450 hrs',
      fuelCapacity: '320 L',
      reachGround: '9.8 m',
      tailSwing: '2.8 m',
      attachments: '36" Trenching Bucket, Thumb'
    },
    description: 'Late model CAT 320 excavator in excellent condition. Perfect for medium to heavy duty earthmoving, trenching, and site preparation. Regularly serviced by dealer. Comes equipped with a hydraulic thumb for debris handling and a standard 36-inch bucket. Tier 4 Final emissions compliant engine suitable for all urban job sites.',
    reviews: [
      {
        id: 'rev-1',
        user: 'John D. Construction',
        avatar: 'JD',
        date: 'Oct 12, 2023',
        rating: 5,
        text: 'Machine arrived on time and fully fueled. The thumb attachment worked flawlessly for clearing concrete debris. Will rent again for our next foundation dig.'
      }
    ]
  },
  {
    id: 'john-deere-210g',
    title: 'John Deere 210G LC Excavator',
    shortName: 'Deere 210G',
    category: 'Excavators',
    brand: 'John Deere',
    owner: 'BuildRight Rentals',
    ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd2UqBHLUwoi85k_Z7IceDtjs-b_adV2kXJdkY16N5e2bunZ9k8W_f8Af8KhUZM5LnsvV7apLWvQdgh1DML2cr2_S5nuLY7fSnWO2gb2oJ7D9flQy740tT6LOxcQAgMYopJxxZYkUcLGsGQyjicURa_xbW2oCEZ1OCqCvC0gfS1cTInp5m14y0ZhB6fMhB19yz-EUKAeYsEoyQD4tRGnxchtd5OV7XunKlxccvN5iJj9-WMn022keZ',
    location: 'Fort Worth, TX Yard',
    distance: '29 km away',
    distanceKm: 29,
    dailyRate: 420,
    rating: 4.7,
    reviewsCount: 18,
    available: true,
    statusText: 'Available',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHvmx6uiU-pZlhnkDFOxv5jfIoPurDo_isD53P20DR73XCTaNfwTckkOmfQN63t9bQ8BCu7RzqNzJaeh2aiWIw5kk6kngBwXnfcaFytEPvzW4yLa0aXUJoIZ6Og0MXp_FW-hPvM8Oq_h9VqJlr9EYCIBTbuwDxXcdPKbKVoWt2UGJ1RjKCWyrd_FcLG51vfd_4Wus_Ha2zwag7p0JYU7q3HBaKRwdwgPe06eic11HI_XSPwsQga_ez',
    photosCount: 4,
    specs: {
      weight: '21,800 kg',
      power: '159 HP',
      digDepth: '6.5 m',
      engineHours: '1,890 hrs',
      fuelCapacity: '310 L',
      reachGround: '9.5 m',
      tailSwing: '2.7 m',
      attachments: 'Standard Dig Bucket'
    },
    description: 'Reliable 210G LC excavator offering high productivity and fuel efficiency. Excellent control response and cabin comfort for long site operations.'
  },
  {
    id: 'bobcat-s650',
    title: 'Bobcat S650 Skid Steer Loader',
    shortName: 'Bobcat S650',
    category: 'Loaders',
    brand: 'Bobcat',
    owner: 'Metro Site Logistics',
    ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwQpqUkCQpw8lr_H_KHyiQ_qK2sHA5oPSK-RpKvrMsOHR1ZltyS8d1tXtgI7smTCZykOkZpvScTgr3uA8fqgU6xgx9G7XkzBFTbPLhnbJM0b2mbSqNkyEoRVU2oX1GL1okR96rMxiVICMCfQ9tY5W-VOwGRZXhwIjTXkWrW1YFhTUinJhHkI1c59iKvlz0fLrtut0RIe-hBlU6-XB16KVcnLuNNx37mU1Rx69CUfHIUCLNFmKyNg8N',
    location: 'Arlington, TX Fleet Depot',
    distance: '5.6 km away',
    distanceKm: 5.6,
    dailyRate: 220,
    rating: 4.8,
    reviewsCount: 42,
    available: true,
    statusText: 'Idle',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoxQHrPpfy6JWbIoIOxnlzXSNL0X--br1DtEnk5YZHdXAvThsQ6ECwaUpxDgTRgYpfpSIw7nsxkCEcp6KDVAPTtXNw4SxOwvOdCs4VAoUW9ewaRDK46GTzz5GrKKCDLsEZtrANkg-XXRI75-cq-ODe3wbi0eppUotC0MyaipmQHCZT9HizPM08lF0ODDOmTufmcpGbgcic80IEc1M02mF-RVyF4sTgdoVBNt5QXNVaRvIGJa4MBgXn',
    photosCount: 3,
    specs: {
      weight: '3,775 kg',
      power: '74 HP',
      digDepth: 'N/A',
      ratedCapacity: '1,220 kg',
      engineHours: '1,120 hrs',
      attachments: 'Smooth Bucket, Pallet Forks'
    },
    description: 'High-performance skid steer loader ideal for site cleanup, material moving, and grade preparation in compact urban site layouts.'
  },
  {
    id: 'jlg-1930es',
    title: 'JLG 1930ES Electric Scissor Lift',
    shortName: 'JLG 1930ES Scissor Lift',
    category: 'Cranes',
    brand: 'JLG',
    owner: 'Aerial Access Co.',
    ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADO9z73Nzwa7X3V1qJSkUAbwoQCPJkAmBMsQ4T7EuP-1msb0Xw4QQ-i3acFoYC0_5AnADODdjqI2pdKXkxW0m11Xi96lbXkJRaKiAhZIok0Un9l2piYs6fZHo5GgiqJfXWStNi51piarqyyW37kFOt5xfxktOrMOHjFjZrNPfTELb1DN_KHgLNhAg8IU1S0ll9ks2duaDVv5qDFTIqbevd6c1xyWYv2_IcOqdlbuK2MFjHOvtE-gDS',
    location: 'Irving, TX Equipment Hub',
    distance: '12 km away',
    distanceKm: 12,
    dailyRate: 150,
    rating: 4.9,
    reviewsCount: 31,
    available: true,
    statusText: 'Available',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7a2T9OMwMSBOhyiAWhZfSY6wzdz-GgklP4nw0Kgwmr-F0Ci159FyalgyT0uhxkCXQKovyoHXkOjuXSstObDGbfoD6Coxj7Z9peVoRljB7VdnwjIg0MMH6Jj0GBs40-oLKcxgVr_ibGU1l9geF2nfkBB_y6JD_wVc9deWHGuFKZpm895SVlDpwDD9gp8qOVJhu6pHHh8Vd5vc75jFPt8UAnEWZdJWC5BreF3ndMkQpBNhJnev1Jn_U',
    photosCount: 3,
    specs: {
      weight: '1,200 kg',
      power: '24V Electric',
      workHeight: '7.8 m',
      platformCapacity: '230 kg'
    },
    description: 'Electric indoor scissor lift with zero emissions and non-marking tires for electrical, HVAC, and ceiling installations.'
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'EQ-8902-CAT',
    equipmentId: 'cat-320',
    equipmentName: 'CAT 320 Excavator',
    provider: 'Texas Heavy Ops Ltd.',
    startDate: '2023-10-12',
    endDate: '2023-10-26',
    durationDays: 14,
    dailyRate: 450,
    totalAmount: 3400,
    status: 'Confirmed', // Confirmed, Active, Delivered, Completed
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf7C104YlflkPCQlIUmAQYgrtcqZl0xjrVpgfTnI5ol3d-MOYS97VLVFndHfXhanIWl48TWPjJ7IHB3MaYWFHl2W6VSZ--bYsuAaj5X1Prf_d0Z5JIUb8z-Qm1ZyjCz0DVrvpvH_26B4TXDN83EcwbdoasLZPZjdTC9XWeAzax-Tg7GmtyWHgypDzUBN3aMyJEm5hqn6oWd2lQZAjkOAb1X7mJbzOq4a7mO9oPQn9iwSNKI13R6SzC',
    deliverySite: 'Site Alpha, Dallas, TX 75001',
    hasOperator: true
  },
  {
    id: 'EQ-4410-JLG',
    equipmentId: 'jlg-1930es',
    equipmentName: 'JLG 1930ES Scissor Lift',
    provider: 'Aerial Access Co.',
    startDate: '2023-10-15',
    endDate: '2023-10-18',
    durationDays: 3,
    dailyRate: 150,
    totalAmount: 450,
    status: 'Delivered',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7a2T9OMwMSBOhyiAWhZfSY6wzdz-GgklP4nw0Kgwmr-F0Ci159FyalgyT0uhxkCXQKovyoHXkOjuXSstObDGbfoD6Coxj7Z9peVoRljB7VdnwjIg0MMH6Jj0GBs40-oLKcxgVr_ibGU1l9geF2nfkBB_y6JD_wVc9deWHGuFKZpm895SVlDpwDD9gp8qOVJhu6pHHh8Vd5vc75jFPt8UAnEWZdJWC5BreF3ndMkQpBNhJnev1Jn_U',
    deliverySite: 'Logistics Park, Building 4',
    hasOperator: false
  },
  {
    id: 'EQ-2291-BOB',
    equipmentId: 'bobcat-s650',
    equipmentName: 'Bobcat S590 Skid Steer',
    provider: 'Metro Site Logistics',
    startDate: '2023-10-01',
    endDate: '2023-10-30',
    durationDays: 30,
    dailyRate: 220,
    totalAmount: 1200,
    status: 'Active',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoxQHrPpfy6JWbIoIOxnlzXSNL0X--br1DtEnk5YZHdXAvThsQ6ECwaUpxDgTRgYpfpSIw7nsxkCEcp6KDVAPTtXNw4SxOwvOdCs4VAoUW9ewaRDK46GTzz5GrKKCDLsEZtrANkg-XXRI75-cq-ODe3wbi0eppUotC0MyaipmQHCZT9HizPM08lF0ODDOmTufmcpGbgcic80IEc1M02mF-RVyF4sTgdoVBNt5QXNVaRvIGJa4MBgXn',
    deliverySite: 'Downtown Commercial Project',
    hasOperator: false
  }
];

export const CATEGORIES = ['All', 'Excavators', 'JCB', 'Cranes', 'Loaders', 'Generators'];
