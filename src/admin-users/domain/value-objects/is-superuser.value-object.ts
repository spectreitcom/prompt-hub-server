export class IsSuperuser {
  private constructor(private readonly value: boolean) {}

  static create(isSuperuser: boolean): IsSuperuser {
    return new IsSuperuser(isSuperuser);
  }

  static superuser(): IsSuperuser {
    return new IsSuperuser(true);
  }

  static notSuperuser(): IsSuperuser {
    return new IsSuperuser(false);
  }

  getValue(): boolean {
    return this.value;
  }

  equals(other: IsSuperuser): boolean {
    return this.value === other.getValue();
  }
}
