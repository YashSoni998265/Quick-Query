function textToQuery(text) {
    const result = {
      conditions: [], // Firestore query conditions
      fields: [],     // Fields to include in output
      sort: null      // Sorting field and direction
    };
    text = text.toLowerCase().trim();

    // Handle "show all users"
    if (text === 'show all users') {
      result.fields = ['name', 'age', 'email', 'city'];
      return result;
    }

    // Handle single-column queries (e.g., "names", "cities")
    const singleColumnMatch = text.match(/^(names|cities|ages|emails)$/);
    if (singleColumnMatch) {
      const field = singleColumnMatch[1].replace(/s$/, ''); // Remove plural
      result.fields = [field];
      return result;
    }

    // Split query into parts for conditions and sorting
    const parts = text.split(' sorted by ');
    const queryText = parts[0].trim();
    const sortText = parts[1]?.trim();

    // Handle conditions
    const conditionParts = queryText.split(' and ').map(part => part.trim());
    conditionParts.forEach(part => {
      // Exact match (e.g., "name = Olivia", "city = San Diego")
      let match = part.match(/(\w+)\s*=\s*([^=].*)/);
      if (match) {
        let [, field, value] = match;
        value = value.trim();
        // Capitalize first letter for name and city
        if (['name', 'city'].includes(field)) {
          value = value.charAt(0).toUpperCase() + value.slice(1);
        }
        // Convert to number for age
        if (field === 'age') {
          value = parseInt(value);
        }
        result.conditions.push({ field, operator: '==', value });
        return;
      }

      // Numeric comparisons (e.g., "age > 30", "age <= 25")
      match = part.match(/(\w+)\s*(>|>=|<|<=)\s*(\d+)/);
      if (match) {
        const [, field, operator, value] = match;
        result.conditions.push({ field, operator, value: parseInt(value) });
        return;
      }

      // Partial match (e.g., "city contains Angeles")
      match = part.match(/(\w+)\s*contains\s*(\w+)/);
      if (match) {
        const [, field, value] = match;
        // Firestore doesn't support contains directly; we'll filter in server.js
        result.conditions.push({ field, operator: 'contains', value });
        return;
      }
    });

    // Handle sorting (e.g., "sorted by age", "sorted by age desc")
    if (sortText) {
      const sortMatch = sortText.match(/(\w+)(\s+desc)?/);
      if (sortMatch) {
        const [, field, desc] = sortMatch;
        result.sort = { field, direction: desc ? 'desc' : 'asc' };
      }
    }

    // Default fields if not specified
    if (!result.fields.length) {
      result.fields = ['name', 'age', 'email', 'city'];
    }

    return result;
  }

  module.exports = textToQuery;