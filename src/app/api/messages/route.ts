import { Container, CosmosClient, ItemResponse } from "@azure/cosmos";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Azure Cosmos DB configuration
const COSMOS_DB_ENDPOINT = `https://${process.env.AZURE_COSMOS_DB_ACCOUNT_NAME}.documents.azure.com:443/`;
const COSMOS_DB_KEY = process.env.AZURE_COSMOS_DB_KEY as string;
const DATABASE_NAME = process.env.AZURE_COSMOS_DB_DATABASE_NAME as string;
const CONTAINER_NAME = process.env.AZURE_COSMOS_DB_CONTAINER_NAME as string;

// Cosmos DB client setup
const cosmosClient = new CosmosClient({
  endpoint: COSMOS_DB_ENDPOINT,
  key: COSMOS_DB_KEY,
});
const container: Container = cosmosClient
  .database(DATABASE_NAME)
  .container(CONTAINER_NAME);

// Type for a message
interface Message {
  id: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
}

// POST - Create a new message
export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    const id = uuidv4();

    // Save message to Cosmos DB
    const { resource: message }: ItemResponse<Message> =
      await container.items.create({
        id,
        text,
        createdAt: new Date().toISOString(),
      });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}

// GET - Retrieve all messages
export async function GET() {
  try {
    const { resources: messages }: { resources: Message[] } =
      await container.items
        .query("SELECT * FROM c ORDER BY c.createdAt DESC")
        .fetchAll();

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    return NextResponse.json(
      { error: "Failed to retrieve messages" },
      { status: 500 }
    );
  }
}

// PUT - Update a message
export async function PUT(req: NextRequest) {
  try {
    const { id, text } = await req.json();

    // Retrieve the existing message to keep createdAt
    const { resource: existingMessage } = await container
      .item(id)
      .read<Message>();
    if (!existingMessage) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    // Update only the fields needed
    const updatedMessage: Message = {
      ...existingMessage,
      text,
      updatedAt: new Date().toISOString(),
    };

    const { resource } = await container.item(id).replace(updatedMessage);

    return NextResponse.json(resource, { status: 200 });
  } catch (error) {
    console.error("Error updating message:", error);
    return NextResponse.json(
      { error: "Failed to update message" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a message
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    await container.item(id).delete();

    return NextResponse.json(
      { message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 }
    );
  }
}
