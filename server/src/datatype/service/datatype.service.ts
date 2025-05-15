import { Injectable } from '@nestjs/common';
import { EthersService } from '../../ethers/ethers.service';

@Injectable()
export class DatatypeService {
  constructor(private readonly ethersService: EthersService) { }

  async positive(value?: number) {
    try {
      // Todo: value 유무에 따라 positiveNumber와 setPositiveNumber의 값을 리턴합니다.
      if (value === undefined) {
        const result = await this.ethersService.positiveNumber();
        return result;
      }

      if (value !== undefined && value >= 0) {
        const result = await this.ethersService.setPositiveNumber(value);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async negative(value?: number) {
    try {
      // Todo: value 유무에 따라 negativeNumber와 setNegativeNumber의 값을 리턴합니다.
      if (value === undefined) {
        const result = await this.ethersService.negativeNumber();
        return result;
      }
      if (value !== undefined && value < 0) {
        const result = await this.ethersService.setNegativeNumber(value);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async isActive() {
    try {
      // Todo: isActive의 값을 리턴합니다.
      const result = await this.ethersService.isActive();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async toggleActive() {
    try {
      // Todo: toggleActive의 값을 리턴합니다.
      const result = await this.ethersService.toggleActive();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async recipient() {
    try {
      // Todo: recipient의 값을 리턴합니다.
      const result = await this.ethersService.recipient();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async wallet(address?: string) {
    try {
      // Todo: address 유무에 따라 wallet과 setWallet의 값을 리턴합니다.
      if (address !== undefined) {
        const setWalletAddress = await this.ethersService.setWallet(address);
        return setWalletAddress;
      }
      if (address === undefined) {
        const walletAddress = await this.ethersService.wallet();
        return walletAddress;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async fixedData(data?: string) {
    try {
      // Todo: data 유무에 따라 getFixedData와 setFixedData의 값을 리턴합니다.
      // ⚠️ data가 byte 형의 데이터인지 확인해야 합니다.(isBytesLike)
      // ⚠️ (byte형이 아닐 시) string -> bytes32(encodeBytes32String)
      // ⚠️ data의 길이는 32바이트로 패딩해야 합니다.(zeroPadValue32)

      if (data === undefined) {
        const result = await this.ethersService.fixedData();
        return result;
      }

      if (data !== undefined) {

        if (await this.ethersService.isBytesLike(data)) {
          const paddingData = await this.ethersService.zeroPadValue32(data);
          const result = await this.ethersService.setFixedData(paddingData);
          return result;
        } else {
          const bytes32Data = await this.ethersService.encodeBytes32String(data);
          const paddingData = await this.ethersService.zeroPadValue32(bytes32Data);
          const result = await this.ethersService.setFixedData(paddingData);
          return result;
        }

      }

    } catch (error) {
      console.log(error);
    }
  }

  async dynamicData(data?: string) {
    try {
      // Todo: data 유무에 따라 dynamicData와 setDynamicData의 값을 리턴합니다.
      // ⚠️ data가 byte 형의 데이터인지 확인해야 합니다.(isBytesLike)
      // ⚠️ (byte형이 아닐 시) string -> bytes(toUtf8Bytes)

      if (data === undefined) {
        const result = await this.ethersService.dynamicData();
        return result;
      }
      if (data !== undefined) {
        if (await this.ethersService.isBytesLike(data)) {
          const result = this.ethersService.setDynamicData(data);
          return result;
        } else {
          const bytesData = await this.ethersService.toUtf8Bytes(data);
          const result = this.ethersService.setDynamicData(bytesData);

          return result;
        }

      }

    } catch (error) {
      console.error(error);
    }
  }

  async getDynamicDataLength() {
    try {
      // Todo: getDynamicDataLength의 값을 리턴합니다.
      const result = this.ethersService.getDynamicDataLength();
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async currentState(state?: number) {
    try {
      // Todo: state 유무에 따라 currentState와 setState의 값을 리턴합니다.
      if (state === undefined) {
        const result = this.ethersService.currentState();
        return result;
      }
      if (state !== undefined) {
        const result = this.ethersService.setState(state);
        return result;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getDetails() {
    try {
      const details = await this.ethersService.getDetails();
      // const result = details.map((item) => {
      //   if (typeof item === 'bigint') {
      //     return item.toString();
      //   } else {
      //     return item;
      //   }
      // });
      // return result;

      const parsed = JSON.parse(
        JSON.stringify(details, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value
        )
      );

      return parsed;
    } catch (error) {
      console.error(error);
    }
  }
}
