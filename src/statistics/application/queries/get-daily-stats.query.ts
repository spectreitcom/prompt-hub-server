export class GetDailyStatsQuery {
  constructor(
    public readonly promptId: string,
    public readonly userId: string,
    public readonly startDate?: Date,
    public readonly endDate?: Date,
  ) {
    // Default to the current month if dates are not provided
    if (!this.startDate) {
      const now = new Date();
      this.startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    if (!this.endDate) {
      const now = new Date();
      // Set to last day of current month
      this.endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }
  }
}
