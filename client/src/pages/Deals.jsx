const fetchDeals = async () => {
  try {
    const res = await api.get("/admin/deals");
    const realData = res.data.data || [];

    // ✅ agar backend se data aaya → use karo
    if (realData.length > 0) {
      setDeals(realData);
    } else {
      throw new Error("Empty data");
    }

  } catch (err) {
    console.log("Using dummy data");

    // 🔥 DUMMY DATA (reference jaisa)
    setDeals([
      {
        _id: "1",
        brandName: "Zara Glow Beauty",
        website: "zaraglow.in",
        partnerId: { name: "Shopify Wizards" },
        stage: "won",
        amount: 499,
        updatedAt: new Date(),
      },
      {
        _id: "2",
        brandName: "FitFlex Apparel",
        website: "fitflexwear.com",
        partnerId: { name: "Shopify Wizards" },
        stage: "demo",
        amount: 499,
        updatedAt: new Date(),
      },
      {
        _id: "3",
        brandName: "Brew Collective",
        website: "brewcollective.in",
        partnerId: { name: "Shopify Wizards" },
        stage: "lost",
        amount: 299,
        updatedAt: new Date(),
      },
    ]);
  }
};