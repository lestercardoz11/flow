import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';
import { format } from 'date-fns';

// Initialize Airtable with API key
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID as string
);

export async function POST(req: NextRequest) {
  try {
    // Parse incoming request body
    const {
      date,
      project,
      teamMember,
      yesterdayStatus,
      currentStatus,
      duration,
      additionalInformation,
    } = await req.json();

    // Step 1: Search for records in Airtable based on "name" and "otherField"
    const getProject = await base(process.env.AIRTABLE_TABLE_PROJECTS as string)
      .select({
        filterByFormula: `({Channel ID} = '${project}')`,
      })
      .firstPage();

    if (getProject.length === 0) {
      return NextResponse.json(
        { error: 'No matching record found' },
        { status: 404 }
      );
    }

    // Step 2: Search for records in Airtable
    const getTeamMember = await base(
      process.env.AIRTABLE_TABLE_TEAM_MEMBERS as string
    )
      .select({
        filterByFormula: `({Member ID} = '${teamMember}')`,
      })
      .firstPage();

    if (getTeamMember.length === 0) {
      return NextResponse.json(
        { error: 'No matching record found' },
        { status: 404 }
      );
    }

    // Step 3: Extract the reference ID from the found record
    const projectId = getProject[0].id;
    const teamMemberId = getTeamMember[0].id;

    // Step 4: Create a new record in Airtable
    const createdRecord = await base(
      process.env.AIRTABLE_TABLE_DEV_LOGS as string
    ).create([
      {
        fields: {
          Date: format(new Date(date), 'MM/dd/yyyy'),
          Project: [projectId],
          'Team Member': [teamMemberId],
          "Yesterday's Status": yesterdayStatus,
          'Current Status': currentStatus,
          'Duration (Hours)': +duration >= 0 ? +duration : 4,
          'Additional Information': additionalInformation,
        },
      },
    ]);

    // Step 4: Return success response with the created record
    return NextResponse.json({
      message: 'Record created successfully',
      createdRecord,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
