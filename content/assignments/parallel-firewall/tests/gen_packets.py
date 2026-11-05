# SPDX-License-Identifier: BSD-3-Clause

import struct
import random
import time
import argparse
import os

PKT_SZ = 256


class SoPacket:
    prev_timestamp = 0

    def __init__(self):
        self.source = random.randint(0, 2**32 - 1)
        self.dest = random.randint(0, 2**32 - 1)
        # Add between 3 and 10 units to the previous timestamp
        self.timestamp = SoPacket.prev_timestamp
        SoPacket.prev_timestamp += random.randint(3, 10)

        payload_size = PKT_SZ - struct.calcsize("IIQ")
        self.payload = os.urandom(payload_size)

    def to_bytes(self):
        header = struct.pack("IIQ", self.source, self.dest, self.timestamp)
        return header + self.payload

    @classmethod
    def from_bytes(cls, data):
        packet = cls()
        packet.source, packet.dest, packet.timestamp = struct.unpack("IIQ", data[:16])
        packet.payload = data[16:]
        return packet

    @classmethod
    def reset_timestamp(cls):
        cls.prev_timestamp = 0


def generate_packets(filename, count, seed):
    # Possibly set the seed for each file
    if seed != 0:
        random.seed(seed)

    SoPacket.reset_timestamp()
    with open(filename, "wb") as f:
        for _ in range(count):
            packet = SoPacket()
            f.write(packet.to_bytes())


def display_packet(filename, index):
    with open(filename, "rb") as f:
        f.seek(index * PKT_SZ)
        data = f.read(PKT_SZ)
        if not data:
            print(f"Packet {index} not found in file.")
            return
        packet = SoPacket.from_bytes(data)
        print(f"Packet {index}:")
        print(f"Source: {packet.source}")
        print(f"Destination: {packet.dest}")
        print(f"Timestamp: {packet.timestamp}")
        print(f"Payload (first 20 bytes): {packet.payload[:20].hex()}")


def main():
    parser = argparse.ArgumentParser(description="Generate so_packets.")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    gen_parser = subparsers.add_parser("generate", help="Generate random packets")
    gen_parser.add_argument("filename", help="Output file name")
    gen_parser.add_argument("count", type=int, help="Number of packets to generate")

    display_parser = subparsers.add_parser("display", help="Display a specific packet")
    display_parser.add_argument("filename", help="Input file name")
    display_parser.add_argument(
        "index", type=int, help="Index of the packet to display (0 indexing)"
    )

    args = parser.parse_args()

    if args.command == "generate":
        generate_packets(args.filename, args.count, 0)
    elif args.command == "display":
        display_packet(args.filename, args.index)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
