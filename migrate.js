/* VENGEFUL REALMS - ONE-TIME GUIDELINE MIGRATION */

async function migrateGuidelines() {
  const { data: { user }, error: authError } =
    await supabaseClient.auth.getUser();

  if (authError || !user) {
    alert("Please log in as an administrator first.");
    return;
  }

  const { data: staff, error: staffError } =
    await supabaseClient
      .from("staff_members")
      .select("role")
      .eq("user_id", user.id)
      .single();

  if (staffError || staff?.role !== "admin") {
    alert("Administrator access required.");
    return;
  }

  const records = offences.map(item => ({
    offence: item.offence,
    category: item.category,
    tier: item.tier,
    punishment: item.punishment,
    notes: item.notes,
    updated_by: user.id
  }));

  const { error } = await supabaseClient
    .from("punishment_guidelines")
    .upsert(records, { onConflict: "offence" });

  if (error) {
    alert("Migration failed: " + error.message);
    return;
  }

  alert(
    `Successfully migrated ${records.length} guidelines!`
  );
}

window.migrateGuidelines = migrateGuidelines;
