import { db } from "./db";
import { countries, counties, constituencies, wards } from "@shared/schema-minimal";

async function seedLocationData() {
  try {
    console.log("Seeding location data...");

    // Insert Kenya as the primary country
    const [kenya] = await db
      .insert(countries)
      .values({
        name: "Kenya",
        code: "KE",
        isActive: true,
        sortOrder: 1,
      })
      .returning();

    console.log("Created Kenya country:", kenya);

    // Insert major Kenya counties
    const kenyaCounties = [
      { name: "Nairobi", code: "001", sortOrder: 1 },
      { name: "Mombasa", code: "002", sortOrder: 2 },
      { name: "Kwale", code: "003", sortOrder: 3 },
      { name: "Kilifi", code: "004", sortOrder: 4 },
      { name: "Tana River", code: "005", sortOrder: 5 },
      { name: "Lamu", code: "006", sortOrder: 6 },
      { name: "Taita Taveta", code: "007", sortOrder: 7 },
      { name: "Garissa", code: "008", sortOrder: 8 },
      { name: "Wajir", code: "009", sortOrder: 9 },
      { name: "Mandera", code: "010", sortOrder: 10 },
      { name: "Marsabit", code: "011", sortOrder: 11 },
      { name: "Isiolo", code: "012", sortOrder: 12 },
      { name: "Meru", code: "013", sortOrder: 13 },
      { name: "Tharaka Nithi", code: "014", sortOrder: 14 },
      { name: "Embu", code: "015", sortOrder: 15 },
      { name: "Kitui", code: "016", sortOrder: 16 },
      { name: "Machakos", code: "017", sortOrder: 17 },
      { name: "Makueni", code: "018", sortOrder: 18 },
      { name: "Nyandarua", code: "019", sortOrder: 19 },
      { name: "Nyeri", code: "020", sortOrder: 20 },
      { name: "Kirinyaga", code: "021", sortOrder: 21 },
      { name: "Murang'a", code: "022", sortOrder: 22 },
      { name: "Kiambu", code: "023", sortOrder: 23 },
      { name: "Turkana", code: "024", sortOrder: 24 },
      { name: "West Pokot", code: "025", sortOrder: 25 },
      { name: "Samburu", code: "026", sortOrder: 26 },
      { name: "Trans Nzoia", code: "027", sortOrder: 27 },
      { name: "Uasin Gishu", code: "028", sortOrder: 28 },
      { name: "Elgeyo Marakwet", code: "029", sortOrder: 29 },
      { name: "Nandi", code: "030", sortOrder: 30 },
      { name: "Baringo", code: "031", sortOrder: 31 },
      { name: "Laikipia", code: "032", sortOrder: 32 },
      { name: "Nakuru", code: "033", sortOrder: 33 },
      { name: "Narok", code: "034", sortOrder: 34 },
      { name: "Kajiado", code: "035", sortOrder: 35 },
      { name: "Kericho", code: "036", sortOrder: 36 },
      { name: "Bomet", code: "037", sortOrder: 37 },
      { name: "Kakamega", code: "038", sortOrder: 38 },
      { name: "Vihiga", code: "039", sortOrder: 39 },
      { name: "Bungoma", code: "040", sortOrder: 40 },
      { name: "Busia", code: "041", sortOrder: 41 },
      { name: "Siaya", code: "042", sortOrder: 42 },
      { name: "Kisumu", code: "043", sortOrder: 43 },
      { name: "Homa Bay", code: "044", sortOrder: 44 },
      { name: "Migori", code: "045", sortOrder: 45 },
      { name: "Kisii", code: "046", sortOrder: 46 },
      { name: "Nyamira", code: "047", sortOrder: 47 },
    ];

    const insertedCounties = await db
      .insert(counties)
      .values(
        kenyaCounties.map((county) => ({
          ...county,
          countryId: kenya.id,
          isActive: true,
        }))
      )
      .returning();

    console.log(`Created ${insertedCounties.length} Kenya counties`);

    // Add some sample constituencies for Nairobi (you can expand this)
    const nairobiCounty = insertedCounties.find(c => c.name === "Nairobi");
    if (nairobiCounty) {
      const nairobiConstituencies = [
        { name: "Westlands", code: "001", sortOrder: 1 },
        { name: "Dagoretti North", code: "002", sortOrder: 2 },
        { name: "Dagoretti South", code: "003", sortOrder: 3 },
        { name: "Langata", code: "004", sortOrder: 4 },
        { name: "Kibra", code: "005", sortOrder: 5 },
        { name: "Roysambu", code: "006", sortOrder: 6 },
        { name: "Kasarani", code: "007", sortOrder: 7 },
        { name: "Ruaraka", code: "008", sortOrder: 8 },
        { name: "Embakasi South", code: "009", sortOrder: 9 },
        { name: "Embakasi North", code: "010", sortOrder: 10 },
        { name: "Embakasi Central", code: "011", sortOrder: 11 },
        { name: "Embakasi East", code: "012", sortOrder: 12 },
        { name: "Embakasi West", code: "013", sortOrder: 13 },
        { name: "Makadara", code: "014", sortOrder: 14 },
        { name: "Kamukunji", code: "015", sortOrder: 15 },
        { name: "Starehe", code: "016", sortOrder: 16 },
        { name: "Mathare", code: "017", sortOrder: 17 },
      ];

      const insertedConstituencies = await db
        .insert(constituencies)
        .values(
          nairobiConstituencies.map((constituency) => ({
            ...constituency,
            countyId: nairobiCounty.id,
            isActive: true,
          }))
        )
        .returning();

      console.log(`Created ${insertedConstituencies.length} Nairobi constituencies`);

      // Add some sample wards for Westlands constituency
      const westlands = insertedConstituencies.find(c => c.name === "Westlands");
      if (westlands) {
        const westlandsWards = [
          { name: "Kitisuru", code: "001", sortOrder: 1 },
          { name: "Parklands/Highridge", code: "002", sortOrder: 2 },
          { name: "Karura", code: "003", sortOrder: 3 },
          { name: "Kangemi", code: "004", sortOrder: 4 },
          { name: "Mountain View", code: "005", sortOrder: 5 },
        ];

        const insertedWards = await db
          .insert(wards)
          .values(
            westlandsWards.map((ward) => ({
              ...ward,
              constituencyId: westlands.id,
              isActive: true,
            }))
          )
          .returning();

        console.log(`Created ${insertedWards.length} Westlands wards`);
      }
    }

    // Add overseas countries for comparison
    const overseasCountries = [
      { name: "Japan", code: "JP", sortOrder: 2 },
      { name: "United Kingdom", code: "GB", sortOrder: 3 },
      { name: "United Arab Emirates", code: "AE", sortOrder: 4 },
      { name: "South Africa", code: "ZA", sortOrder: 5 },
      { name: "Germany", code: "DE", sortOrder: 6 },
      { name: "United States", code: "US", sortOrder: 7 },
    ];

    const insertedOverseasCountries = await db
      .insert(countries)
      .values(
        overseasCountries.map((country) => ({
          ...country,
          isActive: true,
        }))
      )
      .returning();

    console.log(`Created ${insertedOverseasCountries.length} overseas countries`);

    console.log("Location data seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding location data:", error);
  }
}

// Run the seeding function
seedLocationData();